'use client'
import { useState, useEffect } from 'react'
import axios from "axios"


export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/')
        setData(response.data)
    }
    fetchData()
  }, [])


  return (
    <div className="p-4">
      {data && (
        <div>
          {JSON.stringify(data)}
        </div>
      )}
    </div>
  )
}