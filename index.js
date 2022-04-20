import fetch from 'node-fetch';
import dayjs from 'dayjs';
import dotenv from 'dotenv'
dotenv.config()

// fetch based on name and date submissions happened
const getData = async () => {
  const data = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1myndS4dsD6B-7OzKj75SS9XwFoKguoq3QBQUMaqPEns/values/FormResponses1?valueRenderOption=FORMATTED_VALUE&key=${process.env.GOOGLE_SHEET_API}`)
  const response = await data.json();
  const formattedData = formatData(response.values)
  const filteredData = filterData(formattedData, '4-18-2022', 1, 'Cass', 5)
}

const formatData = (responses) => {
  responses.shift()
  return responses.map(response => {
    if (response[2].includes('1')) {
      return {
        date: new Date(response[0].split(' ')[0]),
        studentName: response[1],
        mod: response[2],
        project: response[3],
        projectManager: response[4].toLowerCase(),
        repoLink: response[5]
      }
    } else if (response[2].includes('2')) {
      return {
        date: new Date(response[0].split(' ')[0]),
        studentName: response[1],
        mod: response[2],
        project: response[8],
        projectManager: response[9].toLowerCase(),
        repoLink: response[11]
      }
    } else if (response[2].includes('3')) {
      return {
        date: new Date(response[0].split(' ')[0]),
        studentName: response[1],
        mod: response[2],
        project: response[14],
        projectManager: response[21].toLowerCase(),
        repoLink: response[16]
      }
    }
  })
}
//USER INPUTS:
//date should be typed string m-d-y
//mod will selected number
//projectManager should be typed partial name string
//project will be selected number
const filterData = (data, date, mod, projectManager, project) => {
  const filteredSubmissions = data.filter((submission, index) => {
    if (!submission) {
      console.log('index', index)
    }
    return submission.date >= new Date(date) && submission.mod.includes(mod) && submission.projectManager.includes(projectManager.toLowerCase()) && submission.project.includes(project)
  })
  return filteredSubmissions
}

getData();
