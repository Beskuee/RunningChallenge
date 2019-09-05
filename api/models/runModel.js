class Run {
    constructor (data) {
        this.name = data.name;
        this.numberKmRan = data.numberKmRan;
        this.numberCaloriesBurnt = data.numberCaloriesBurnt;
        this.startDate = data.startDate;
        this.stopDate = data.stopDate;
    }
}

module.exports = Run;