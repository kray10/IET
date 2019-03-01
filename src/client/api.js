export default {

  gets(url) {
    return {
      getGoalById: async (id) =>{
        const response = await fetch(`/api/goal/${id}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      },

      getStudentsByUser: async (userid) => {
        const response = await fetch(`/api/students/${userid}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      },

      getGoalsByStudent: async (studentid) => {
        const response = await fetch(`/api/goal/${studentid}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      }
    }
  },

  posts(url) {
    return {
      createGoal: async (goal) => {
        const response = await fetch('/api/createGoal', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(goal)
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      },
      addUserAccess: async (studentid, userid) => {
        const response = await fetch(`/api/updateAccess`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            studentID: studentid,
            userID: userid
          })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      },
      addGoalDatapoint: async (goalData) => {
        const response = await fetch(`/api/addGoalData`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(goalData)
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      }
    }
  }
}
