import { TotalWinner } from '../interface/interface';

class WinnerMessage {
    render({ name, time }: TotalWinner): string {
        return `
    <h3>${name} came first [${time}s]!</h3>
    `;
    }
}
const winnerMessage = new WinnerMessage();
export default winnerMessage;
