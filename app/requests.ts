import {ArquiRequest, NailCutData} from "@/app/models"

// Fetch nail-cutting system parameters from the provided external URL
async function getParameters(): Promise<NailCutData[]> {
  try {
    const response = await fetch("/api/getlast", { cache: "no-store" })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}\nResponse message: ${response.statusText}`)
    }
    const data: ArquiRequest = await response.json()
    // Expecting an array of { fsr, angle, cutOk, state, distance }
    return Array.isArray(data.last_parameters) ? data.last_parameters as NailCutData[] : []
  } catch (error) {
    console.error(error)
    return []
  }
}

export { getParameters }

