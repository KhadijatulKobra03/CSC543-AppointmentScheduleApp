categoryValue = document.querySelector('input[name="classLevel"]:checked').value;
console.log(categoryValue);
document.getElementById("levels").addEventListener("click", updateLevel);

displayClasses = document.getElementById("displayClasses");

function updateLevel() {
    categoryValue = document.querySelector('input[name="classLevel"]:checked').value;
    console.log(categoryValue)

    let by = '  <div class="row p-2"> \
                <h3>Beginner Yoga</h3> \
                <p>Great for people with limited experince in yoga. This class explores the fundamentals of yoga \
                        practice. \
                        Beginner friendly poses: Downward-Facing Dog, Cat-Cow Pose, Tree Pose and other. Student \
                        will \
                        also learn breathing techniques and gentle stretches.</p> \
            </div> \
        ';

    let iy = '  <div class="row p-2"> \
                <h3>Intermediate Yoga</h3> \
                <p>More challenging positions, class introduces a wider range of postures with more complexity. \
                        You \
                        will learn Camel Pose, Boat Pose, Revolved Triangle Pose and many more. </p> \
            </div> \
        ';

    let ay = '  <div class="row p-2"> \
                <h3>Advanced Yoga</h3> \
                <p>Class for those that already have significant experience in yoga. Explores more challenging \
                        poses: Crow Pose, Half Moon Pose, Scorpion Pose, Flying Pigeon Pose and more. Designed for \
                        experienced yogis, class with more difficult postures. </p> \
            </div> \
        ';

    let gy = '  <div class="row p-2"> \
                <h3>Gentle Yoga</h3> \
                <p>This yoga is performed at a slower pace, with less intense positions. Modifications can be \
                        offered as \
                        you practice the poses. Suitable for beginners, seniors, or those seeking a more relaxing \
                        exercise.</p> \
            </div> \
            ';

    let cy = '  <div class="row p-2"> \
                <h3>Chair Yoga</h3> \
                <p>Chair yoga is a modified form of yoga that can be practiced while seated in a chair. It is a \
                    gentle \
                        and accessible way to improve flexibility, strength, and balance. This type of yoga is \
                        suitable \
                        for all fitness levels, but is especially beneficial for people with mobility limitations or \
                        for \
                        those that have difficulty standing for long periods.</p> \
            </div> \
        ';

    let kty = ' <div class="row p-2"> \
                <h3>Kids and Teens Yoga</h3> \
                <p>For ages 10-18. Beginner friendly poses. Students will learn proper alignment and basic \
                        asanas. \
                        Helps calm the mind and body, teaches body awarness. \
                        This class is great for younger students.</p> \
            </div> \
            ';

    let m = '   <div class="row p-2"> \
                <h3>Meditation</h3> \
                <p>Please join us for a 60 min class that includes exercises designed to help reduce stress. \
                        Guided \
                        meditation can help focus and clear your mind.</p> \
            </div> \
        ';

    switch (categoryValue) {
        case "all": {
            displayClasses.innerHTML = by + iy + ay + gy + cy + kty + m;
            break;
        };
        case "beginner": {
            displayClasses.innerHTML = by + gy + cy + kty + m;
            break;
        };
        case "intermediate": {
            displayClasses.innerHTML = iy;
            break;
        };
        case "advanced": {
            displayClasses.innerHTML = ay;
            break;
        };

    }


};

updateLevel();
