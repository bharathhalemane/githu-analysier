import { useEffect, useState } from "react"
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from "recharts"

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const PieChartData = ({ owner, repo }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (!owner || !repo) return

    const fetchLanguages = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/languages`
        )
        const json = await res.json()

        if (json.message) {
          console.error(json.message)
          return
        }

        const formatted = Object.entries(json).map(([key, value]) => ({
          name: key,
          value,
        }))

        setData(formatted)
      } catch (err) {
        console.error(err)
      }
    }

    fetchLanguages()
  }, [owner, repo])

  if (!data.length) return <p>Loading chart...</p>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartData