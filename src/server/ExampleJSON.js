module.exports = {
    goalJSON: {
        GoalID: 123456,
        GoalName: 'Test Form',
        Owner: 987654,
        Tasks: [
            {
                TaskName: 'Task 1',
                TaskType: 'yesNo',
                TaskOptions: null
            },
            {
                TaskName: 'Task 2',
                TaskType: 'textBox',
                TaskOptions: null
            },
            {
                TaskName: 'Task 3',
                TaskType: 'increment',
                TaskOptions: null
            },
            {
                TaskName: 'Task 4',
                TaskType: 'timer',
                TaskOptions: null
            },
            {
                TaskName: 'Task 5',
                TaskType: 'dropdown',
                TaskOptions: ['option 1', 'option 2', 'option 3', 'option 4']
            },
            {
                TaskName: 'Task 6',
                TaskType: 'submitReset',
                TaskOptions: null
            }
        ]
    },

    userAccessJSON: {
        userID: 123456,
        editStudents: [111111, 222222, 333333, 444444],
        adminStudents: [987654, 876543, 765432, 654321]
    },

    goalsByStudent: {
        studentID: 987654,
        studentName: 'Mittens', //May not want to store this, but for now...
        goals: [
            {
                goalName: 'Identify Letter L',
                goalID: 77777
            },
            {
                goalName: 'Respond To Commands',
                goalID: 88888
            },
            {
                goalName: 'Learn Muliplication Tables',
                goalID: 99999
            }
        ]
    },

    goalData: {
        goalID: 123456,
        goalData: null
    }
};
