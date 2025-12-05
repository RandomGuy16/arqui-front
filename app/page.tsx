"use client"
import { useState, useEffect } from "react"
import { getParameters } from "@/app/requests"
// import AquariumParametersGraph from "@/app/ParametersGraph"
import { NailCutData } from "@/app/models"

export default function Monitor() {
  const [nailData, setNailData] = useState<NailCutData[]>([])

  const fetchData = async () => {
    try {
      const data = await getParameters()
      setNailData(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error(error)
      setNailData([])
    }
  }

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(() => {
      fetchData()
    }, 2000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-start min-h-screen bg-(--bg-1) p-6">
        {/* Simple data display for the nail-cutting system */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Lecturas del sistema de corte de uñas</h2>
          {nailData.length === 0 ? (
            <div className="text-gray-500">Sin datos disponibles</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">fsr</th>
                    <th className="py-2 px-3">angle</th>
                    <th className="py-2 px-3">cutOk</th>
                    <th className="py-2 px-3">state</th>
                    <th className="py-2 px-3">distance</th>
                  </tr>
                </thead>
                <tbody>
                  {nailData.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{idx + 1}</td>
                      <td className="py-2 px-3">{item.fsr}</td>
                      <td className="py-2 px-3">{item.angle}</td>
                      <td className="py-2 px-3">{item.cutOk}</td>
                      <td className="py-2 px-3">{item.state}</td>
                      <td className="py-2 px-3">{item.distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/*
        { Keep the ParametersGraph component mounted but with no data as requested}
        <div className="flex flex-1 flex-col w-full items-center justify-start mt-6">
          <div className="flex flex-1 flex-col w-full lg:w-3/4 p-0 rounded-2">
            <AquariumParametersGraph last_parameters={[]} />
          </div>
        </div>
        */}
      </main>
    </>
  )
}

