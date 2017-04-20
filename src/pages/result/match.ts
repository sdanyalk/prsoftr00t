export interface Match {
    matchID: number,
    points: number,
    team1ID: number,
    team1Name: string,
    team1LogoPath: string,
    team2ID: number,
    team2Name: string,
    team2LogoPath: string,
    locked: boolean,
    date: Date
}