import fetch from 'node-fetch';
import dayjs from 'dayjs';
import dotenv from 'dotenv'
dotenv.config()


// fetch based on name and date submissions happened
const getData = async () => {
  const data = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1myndS4dsD6B-7OzKj75SS9XwFoKguoq3QBQUMaqPEns/values/FormResponses1?valueRenderOption=FORMATTED_VALUE&key=${process.env.GOOGLE_SHEET_API}`)
  const response = await data.json();
  filterData(response.values)
}

const filterData = (responses) => {
  const result = responses.map(response => {
    if (response[2].includes('1')) {
      return {
        date: response[0].split(' ')[0],
        studentName: response[1],
        mod: response[2],
        project: response[3],
        projectManager: response[4],
        repoLink: response[5]
      }
    } else if (response[2].includes('2')) {
      return {
        date: response[0].split(' ')[0],
        studentName: response[1],
        mod: response[2],
        project: response[8],
        projectManager: response[9],
        repoLink: response[11]
      }
    } else if (response[2].includes('3')) {
      return {
        date: response[0].split(' ')[0],
        studentName: response[1],
        mod: response[2],
        project: response[14],
        projectManager: response[21],
        repoLink: response[16]
      }
    }
  })
  console.log(result);

  // Filter by mod and date and project manager and project
  // Use includes logic for project manager (.lowerCase() and .includes())
  // Filter by date range
  // dayjs isAfter()


}

getData();