
// export const activeMembersAllTeams = ( teams ) => {
//         return teams.map( team => team.members.filter( m => m.active === true))

import { Teams, TeamsResponse } from "../interfaces/interfaces.auth";

// };

export const allTeamsMembers = (teams:TeamsResponse[]):Teams[] => {
    const newTeams = teams.map(team => {
        return {
            ...team,
            contacts: [],
            members: team.members.map(user => ({
                uid: user._id?.uid ,
                active: user.active,
                rol: user.rol,
                email: user._id?.email,
                name: user._id?.name,
                lastname: user._id?.lastname,
            }))
        }
    })
    return newTeams
};

export const activeMembersAllTeams = (teams:TeamsResponse[]):Teams[] => {
    return teams.map(team => {

        const activeMembers = team.members?.filter( member => member.active ) || []
        const contacts = activeMembers.map( member => member._id?.contacts || [] ).flat()

        return {
            ...team,
            contacts,
            members: activeMembers
                .map(user => ({
                    uid: user._id?.uid,
                    active: user.active,
                    rol: user.rol,
                    email: user._id?.email,
                    name: user._id?.name,
                    lastname: user._id?.lastname,
                    contacts: user._id?.contacts || [],
                }))
        }
    })
};


//------------ Divide intakes por grupo -------------


export const teamsAll = (teamsAdmin:TeamsResponse[], teamsUser:TeamsResponse[]) => {
    return [...teamsAdmin.map(r => ({ _id: r._id, name: r.name })), ...teamsUser.map(r => ({ _id: r._id, name: r.name }))]
};


// export const teamName = (teams, teamId) => {
//     const team = teams.find(team => team._id === teamId)
//     return team ? team.name : "--"
// }

// export const teamInCharge = (teams:Teams[], teamId:string | null, userData):string | boolean=> {
//     const team = teams.find(team => team._id === teamId)
//     const findUserId = team?.members?.find(m => m.uid === userData.uid)

//     if( findUserId ) {return userData?.name + " " + (userData?.lastname || "") || false}
//     else { return false }
// }