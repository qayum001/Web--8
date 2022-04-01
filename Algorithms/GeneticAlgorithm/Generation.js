class Generation {

    constructor(mass, Matrix, Population, Mutation) {
        this.Individuals = new Array();
        this.Population = Population;
        this.Mutation = Mutation;
        this.len = mass.length;
        this.Matrix = Matrix;
        this.BestIndividual;

        for (let i = 0; i < this.Population; i++) {
            this.Individuals.push(new Individual(this.len, this.Matrix));
        }

        this.Individuals.sort((a, b) => a.Distance - b.Distance);
        this.BestIndividual = this.Individuals[0];
    }

    NextGeneration(Matrix) {
        for (let i = 0; i < this.Population; i++) {
            for (let j = 0; j < this.Population; j++) {
                if (i == j) {
                    continue;
                }
                this.Individuals.push(this.Reproduction(this.Individuals[i], this.Individuals[j], Matrix));
            }
        }

        this.Individuals.sort((a, b) => a.Distance - b.Distance);
        this.Exclusion();
        this.BestIndividual = this.Individuals[0];
    }

    Reproduction(Individual1, Individual2, Matrix) {
        let PointGap = rand(1, this.len - 1);
        let CurrentIndividual = new Individual(this.len, this.Matrix);

        for (let i = 0; i < PointGap; i++) {
            CurrentIndividual.Genes[i] = Individual1.Genes[i];
        }

        let iter = PointGap;
        
        for (let i = PointGap; i < this.len; i++) {
            if (!this.isGenUsed(CurrentIndividual, Individual2, iter, i)) {
                CurrentIndividual.Genes[iter] = Individual2.Genes[i];
                iter++;
            }
        }

        for (let i = PointGap; i < this.len; i++) {
            if (!this.isGenUsed(CurrentIndividual, Individual1, iter, i)) {
                CurrentIndividual.Genes[iter] = Individual1.Genes[i];
                iter++;
            }
        }

        if (Math.random() <= this.Mutation) {
            let a = rand(0, this.len);
            let b = rand(0, this.len);
            while(a == b) {
                a = rand(0, this.len);
            }
            [CurrentIndividual.Genes[a], CurrentIndividual.Genes[b]] = [CurrentIndividual.Genes[b], CurrentIndividual.Genes[a]];
        }

        CurrentIndividual.SetDistance(Matrix);

        return CurrentIndividual;
    }

    isGenUsed(CurrentIndividual, Individual1, iter, index) {
        for (let i = 0; i < iter; i++) {
            if (Individual1.Genes[index] == CurrentIndividual.Genes[i]) {
                return true;
            }
        }
        return false;
    }
    
    Exclusion() {
        for (let i = 1; i < this.Individuals.length; i++) {
            if (this.Individuals[i - 1].Distance == this.Individuals[i].Distance) {
                this.Individuals.splice(i, 1);
                i--;
            }
        }
        if (this.Individuals.length - this.Population > 0) {
            this.Individuals.splice(this.Population, this.Individuals.length - this.Population);
        }
    }

}