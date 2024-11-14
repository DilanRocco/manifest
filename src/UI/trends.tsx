import { Heading, HStack, Text, VStack } from "@chakra-ui/react"
import {  useQuery } from '@apollo/client';
import { useCallback, useEffect, useRef } from "react";
import { getUser } from "@/graphql/user";
import { GetHistoryQuery, GetHistoryQueryVariables, GetUsersQuery, GetUsersQueryVariables }  from "@/generated/graphql"
import '@/UI/trends.css'
import { getHistory } from "@/graphql/history";
import { ChartOptions, Chart, ChartData } from "chart.js";
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
    const userQuery = useQuery<GetUsersQuery, GetUsersQueryVariables>(getUser);
    const historyQuery = useQuery<GetHistoryQuery, GetHistoryQueryVariables>(getHistory);


    const user = userQuery.data?.userCollection?.edges[0].node 
    const history = historyQuery.data?.historyCollection?.edges[0].node 

    const canvasRef = useRef<HTMLCanvasElement>(null);
      const chartRef = useRef<Chart | null>(null);
      useEffect(() => {
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
        //myChart.destroy()
        console.log("ARE WE GETTING HERER?")
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
                datasets: [
                  {
                    label: 'Dataset',
                    data: [0,1,2,3,4,5],
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
              plugins: {
                title: {
                  display: true,
                  text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
                }
              }
            }
    
          })
          return () => {
            if (chartRef.current) {
              console.log('Cleanup: destroying chart');
              chartRef.current.destroy();
              chartRef.current = null;
            }
          };
        }, []); 
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