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
        editStudents: [1111, 22222, 333333, 444444],
        adminStudents: [9999, 8888, 444444, 77777]
    },

    goalsByStudent: {
        studentID: 987654,
        goals: [
            {
                goalName: 'goal1',
                goalID: 77777
            }, 
            {
                goalName: 'goal2',
                goalID: 88888
            }, 
            {
                goalName: 'goal3',
                goalID: 99999
            }
        ]
    },

    goalData: {
        goalID: 123456,
        goalData: null
    }
};
