import fetch from 'node-fetch';
import Enquirer from 'enquirer';
import dotenv from 'dotenv';
import shell from 'shelljs';

const { prompt } = Enquirer;
dotenv.config()


// Create a Mod2/ students projects/whats-cooking/

// As each one is cloned, rename it with the student name (michael-emma-dillan)

// fetch based on name and date submissions happened
const getData = async () => {
  const data = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1myndS4dsD6B-7OzKj75SS9XwFoKguoq3QBQUMaqPEns/values/FormResponses1?valueRenderOption=FORMATTED_VALUE&key=${process.env.GOOGLE_SHEET_API}`)
  const response = await data.json();
  const formattedData = formatData(response.values);
  const instructorAnswers = await getInstructorInput();
  const filteredData = filterData(formattedData, ...Object.values(instructorAnswers));
  cloneDownRepos(filteredData)
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

const getInstructorInput = async () => {
  return await prompt([
  {
    type: 'input',
    name: 'projectKickoffDate',
    message: 'What date did you kick off the project?'
  },
  {
    type: 'select',
    name: 'module',
    message: 'Which module?',
    choices: [{
      name: 1,
      message: 'Mod 1',
    }, {
      name: 2,
      message: 'Mod 2',
    }, {
      name: 3,
      message: 'Mod 3',
    }],
  },
  {
    type: 'input',
    name: 'projectManager',
    message: 'Enter your name or part of your name. This will be used in a .includes for filtering based on student input.'
  }, 
  {
    type: 'select',
    name: 'project',
    message: 'Which project is this?', 
    choices: [{
      name: 1,
      message: '1 - First Solo Project',
    }, {
      name: 2,
      message: '2 - Paired Project',
    }, {
      name: 3,
      message: '3 - Mid-Mod Solo Challenge',
    }, {
      name: 4,
      message: '4 - Group Project',
    }, {
      name: 5,
      message: '5 - Final Solo Project',
    }]
  }
]);
}

const cloneDownRepos = filteredData => {
  console.log(filteredData)
  filteredData.forEach(submission => {
    const repoName = submission.studentName.trim().replaceAll(/[,.()' ;]/g, "-");
    shell.exec(`git clone ${submission.repoLink} ${repoName}`);
    shell.cd(`${repoName}`);
    shell.exec(`npm i`);
    shell.cd('..');
  })
}

getData();
