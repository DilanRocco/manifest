import { Heading, HStack, VStack, Text, Box } from "@chakra-ui/react"
import {  useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from "react";
 
import { getUser } from "@/graphql/user";
import { User, History }  from "@/generated/graphql"
import '@/UI/trends.css'
import { Chart } from "chart.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController
}  from 'chart.js';
import { useDatabase } from "@/provider/databaseProvider";
import { timeStamp } from "console";
import { updateHistory } from "@/graphql/history";
import { useAuth } from "@/provider/authProvider";
import { convertHistoryToGraph, determineMaxStreak, determineStreak } from "./streak";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend
  );
  

const Trends = () => {
    const {fest, history, user, loading: databaseLoading, error: databaseError, refresh } = useDatabase()
    const [updateStreakField, { data: dataStreak, loading: loadingStreak, error: errorStreak }] = useMutation(updateHistory);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);
    const [consistencyScore, setConsistencyScore] = useState(0)
    const [avgHour, setAvgHour] = useState("")
    const authApi = useAuth()
    const [streak, setStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)
    const [damagedStreak, setDamagedStreak] = useState(false)

    const avgHrToManfiest = (festTimes: number[]) => {
      const hours = festTimes.map(time => {
        return new Date(time).getHours()
      })
      const sum = hours.reduce((acc, num) => acc + num, 0);
      const hourInMiltary = Math.floor(sum / hours.length);
      if (hourInMiltary === 0) return "12AM";
      if (hourInMiltary === 12) return "12PM";
      return hourInMiltary > 12 ? (hourInMiltary - 12)+"PM" : hourInMiltary+"AM";


    }
    
    function getDatesFromStartToToday(startTimestamp: number, damagedStreak: boolean): string[] {
      const startDate = new Date(startTimestamp);
      const today = new Date();
      const dates: string[] = [];
      const offset = damagedStreak ? 0 : 1
      console.log(offset, "OFFSET")
      today.setDate(today.getDate() + offset);
      startDate.setDate(startDate.getDate());
      while (startDate <= today) {
          const month = startDate.getMonth() + 1; // Months are 0-indexed
          const day = startDate.getDate();
          dates.push(`${month}/${day}`);
          startDate.setDate(startDate.getDate() + 1);
      }
  
      return dates;
  }
  
    
      useEffect(() => {
        if (history?.fest_time == undefined) {
          return
        }
        
        const festTimes = JSON.parse(history?.fest_time)
        if (!canvasRef.current) {
            return
        }
        setMaxStreak(determineMaxStreak(festTimes))
        setStreak(determineStreak(festTimes))
        console.log(streak, "STREWKA")
        const dataPoints = convertHistoryToGraph(festTimes)
        var damage = false
        if (dataPoints.length > 1 && dataPoints[dataPoints.length-1] == 0 && dataPoints[dataPoints.length-2] != 0) {
          damage = true
        } else {
          damage = false
        }
        setDamagedStreak(damage)
        console.log(dataPoints)
        if (festTimes.length == 0) {
          return
        }
        const avgTimeToManifest = avgHrToManfiest(festTimes)
        setAvgHour(avgTimeToManifest)
        const labels = getDatesFromStartToToday(festTimes[0], damage)
        setConsistencyScore(Math.round(festTimes.length / labels.length * 100))
        console.log(labels)
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        if (chartRef.current) {
            chartRef.current.destroy();
          }
          chartRef.current?.destroy()
          chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Streak Graph',
                    data: dataPoints,
                    borderColor: "#ffffff",
                    backgroundColor: "#ffffff",
                    pointStyle: 'circle',
                    pointRadius: 3,
                    pointHoverRadius: 10
                    
                  }
                ]
              },
            options: {
              responsive: true,
            }
    
          })
          return () => {
            if (chartRef.current) {
              chartRef.current.destroy();
              chartRef.current = null;
            }
          };
        }, [user, history]); 

    return <VStack spaceY="2">
         <Heading size="4xl" className="title">Hello {user?.first}</Heading>
         <HStack>
        <div className="maincontainer">
            <div className="container">
                <div className="space">  </div>
                <div className="streak">{maxStreak}</div>
            </div>
            <div className="text"> Max Streak </div>
        </div>

        <div className="maincontainer">
            <Box backgroundColor={damagedStreak ? "red.600" : "#F17300"} className="container">
                <div className="space">  </div>
                <div className="streak">{streak}</div>
            </Box>
            <div className="text"> Current Streak </div>
        </div>
        </HStack>
        <div>
        <canvas ref={canvasRef}></canvas>
        
        <Text fontSize={'1xl'}><b>Avg Hour to Manifest: {avgHour} </b></Text>
        <Text fontSize={'1xl'}><b>Consistency Score {consistencyScore}%</b></Text>
        </div>
        
       
        </VStack>
}

export default Trends