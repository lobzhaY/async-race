class CarCreateUtils {
    private models: string[] = [
        'Audi',
        'BMW',
        'Ford',
        'Honda',
        'Hyundai',
        'Kia',
        'Lada',
        'Mazda',
        'Toyota',
        'Volkswagen',
    ];
    private names: string[] = [
        'X-Trail',
        'Tucson',
        'Camaro',
        'Cayenne',
        'Xray',
        'GTI',
        'Touareg',
        'Civic',
        'Santafe',
        'Discovery',
    ];

    getRandomName(): string {
        const model: string = this.models[Math.floor(Math.random() * this.models.length)];
        const name: string = this.names[Math.floor(Math.random() * this.models.length)];

        return `${model} ${name}`;
    }

    getRandomColor(): string {
        const color = () => Math.floor(Math.random() * 256);

        return `rgb(${color()}, ${color()}, ${color()})`;
    }

    generateRandomCars(count = 100): { name: string; color: string }[] {
        return new Array(count).fill(1).map(() => ({ name: this.getRandomName(), color: this.getRandomColor() }));
    }
}
const carCreateUtils = new CarCreateUtils();
export default carCreateUtils;
