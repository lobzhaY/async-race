import { Car } from '../components/index';
import { IRace, IState, TotalWinner } from '../interface/interface';
import store from '../store/store';

class CarAnimationUtils {
    animationCar(car: HTMLElement, distance: number, timeAnimation: number): IState {
        let start: number | null = null;
        const state: IState = {};

        function stepAnimation(timestamp: number) {
            if (!start) start = timestamp;

            const time = timestamp - start;
            const passed = Math.round(time * (distance / timeAnimation));

            car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

            if (passed < distance) {
                state.id = window.requestAnimationFrame(stepAnimation);
            }
        }
        state.id = window.requestAnimationFrame(stepAnimation);
        return state;
    }

    async raceAll(promises: Promise<IRace>[], idArr: number[]): Promise<TotalWinner> {
        const { success, id, time } = await Promise.race(promises);
        if (!success) {
            const failIndex = idArr.findIndex((i) => i === id);
            const restPromises = [...promises.slice(0, failIndex), ...promises.slice(failIndex + 1, promises.length)];
            const restIdArr = [...idArr.slice(0, failIndex), ...idArr.slice(failIndex + 1, idArr.length)];
            return this.raceAll(restPromises, restIdArr);
        }
        return { ...store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
    }

    async race(): Promise<TotalWinner> {
        const driveAll = store.cars.map((elem) => {
            return Car.startDriving(elem.id);
        });
        const winner = await this.raceAll(
            driveAll,
            store.cars.map((car) => car.id)
        );
        return winner;
    }

    getPositionCenter(elem: HTMLElement): { x: number; y: number } {
        const { top, left, width, height } = elem.getBoundingClientRect();
        return {
            x: left + width / 2,
            y: top + height / 2,
        };
    }

    getDistanceBetweenElements(x: HTMLElement, y: HTMLElement): number {
        const xPosition = this.getPositionCenter(x);
        const yPosition = this.getPositionCenter(y);
        return Math.hypot(xPosition.x - yPosition.x, xPosition.y - yPosition.y);
    }
}
const carAnimationUtils = new CarAnimationUtils();
export default carAnimationUtils;
