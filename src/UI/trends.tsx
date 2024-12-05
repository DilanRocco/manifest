import { Heading, HStack, VStack } from "@chakra-ui/react"
import {  useQuery } from '@apollo/client';
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
   
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);
    const convertHistoryToGraph = (festTimes: number[]) => {
        var now = new Date();
        const daySinceEpoch = Math.floor(now.valueOf()/8.64e7)
        const newTimes = festTimes.map(time => {  
            return daySinceEpoch - Math.floor((time/8.64e7))
        })

        const max = newTimes.reduce((a, b) => Math.max(a, b), -Infinity);
        console.log(newTimes)
        let data: number[] = []
        for (let i = max; i > 0; i--) {
            if (newTimes.indexOf(i) != -1){
                (i!=max) ? data.push(data[data.length-1]+1) : data.push(1)
            } else {
                data.push(0)
            }
            
        }
        return data
    }
   
    
      useEffect(() => {
        
        // setHistory(history)
        // setUser(user)
        if (history?.fest_time == undefined) {
          return
        }
        const festTimes = JSON.parse(history?.fest_time)
        
        if (!canvasRef.current) {
            console.log("STUCK IN THIS")
            return
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        if (chartRef.current) {
            chartRef.current.destroy();
          }
          chartRef.current?.destroy()
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8','Day 9'],
                datasets: [
                  {
                    label: 'Dataset',
                    data: convertHistoryToGraph(festTimes),
                    borderColor: "#ffffff",
                    backgroundColor: "#ffffff",
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                    
                  }
                ]
              },
            options: {
             
              responsive: true,

            }
    
          })
          return () => {
            if (chartRef.current) {
              console.log('Cleanup: destroying chart');
              chartRef.current.destroy();
              chartRef.current = null;
            }
          };
        }, [user, history]); 

    return <VStack>
         <Heading size="4xl" className="title">Hello {user?.first}</Heading>
         <HStack>
        <div className="maincontainer">
            <div className="container">
                <div className="space">  </div>
                <div className="streak">{history?.max_streak}</div>
            </div>
            <div className="text"> Max Streak </div>
        </div>

        <div className="maincontainer">
            <div className="container">
                <div className="space">  </div>
                <div className="streak">{history?.streak}</div>
            </div>
            <div className="text"> Current Streak </div>
        </div>
        </HStack>
        <div>
        <canvas ref={canvasRef}></canvas>
        </div>
        
       
        </VStack>
}

export default Trends