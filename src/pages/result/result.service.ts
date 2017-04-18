import { Match } from './match';

export class MatchService {
    getAll(): Match[] {
        return[
            {matchID: 10, team1ID: 1, team1Name: 'Team A', team2ID: 2, team2Name: 'Team B'},
            {matchID: 20, team1ID: 3, team1Name: 'Team C', team2ID: 4, team2Name: 'Team D'}
        ];
    }
}