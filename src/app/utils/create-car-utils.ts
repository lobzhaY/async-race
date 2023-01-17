
class CarCreateUtils {
  private models: string[] = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lada', 'Mazda', 'Toyota', 'Volkswagen'];
  private names: string[] = ['X-Trail', 'Tucson', 'Camaro', 'Cayenne', 'Xray', 'GTI', 'Touareg', 'Civic', 'Santafe', 'Discovery'];

  getRandomName() {
    const model: string = this.models[Math.floor(Math.random() * this.models.length)];
    const name: string = this.names[Math.floor(Math.random() * this.models.length)];

    return `${model} ${name}`;
  }

  getRandomColor() {
    const color = () => Math.floor(Math.random() * 256);

    return `rgb(${color()}, ${color()}, ${color()})`;
  }

  generateRandomCars(count: number = 100) {
    return new Array(count).fill(1).map((elem) => ({ name: this.getRandomName(), color: this.getRandomColor() }))
  }
}
const carCreateUtils = new CarCreateUtils();
export default carCreateUtils;