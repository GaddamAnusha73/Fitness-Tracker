function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to m
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert("Please enter valid weight and height.");
      return;
    }

    const bmi = weight / (height * height);
    const result = bmi.toFixed(2);
    let category = '';
    let exercises = '';
    let waterIntake = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      exercises = 'Yoga, Light Cardio, Strength Training';
      waterIntake = '2.5 - 3 Liters per day';
    } else if (bmi < 24.9) {
      category = 'Normal weight';
      exercises = 'Running, Cycling, Strength Training';
      waterIntake = '3 - 3.5 Liters per day';
    } else if (bmi < 29.9) {
      category = 'Overweight';
      exercises = 'Cardio, Swimming, Cycling, Strength Training';
      waterIntake = '3.5 - 4 Liters per day';
    } else {
      category = 'Obese';
      exercises = 'Walking, Low-Impact Cardio, Yoga, Strength Training';
      waterIntake = '4 - 5 Liters per day';
    }

    document.getElementById('bmi-result').innerHTML = `Your BMI is <strong>${result}</strong> (${category})`;
    document.getElementById('exercise').innerHTML = `<strong>Suggested Exercises:</strong> ${exercises}`;
    document.getElementById('water').innerHTML = `<strong>Recommended Water Intake:</strong> ${waterIntake}`;
  }
