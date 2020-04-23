const database = firebase.database();

function AddMonth(monthIndex=1, year=2020)
{
    if (!firebase.auth().currentUser)
    {
        setTimeout(() => { AddMonth(monthIndex, year) }, 500);
        return;
    }

    let i=1;
    let monthToAdd = {}

    while (i <= DayCount(monthIndex, year))
    {
        monthToAdd[i] = 0;
        i += 1;
    }

    const uid = firebase.auth().currentUser.uid;

    database
        .ref('/users/' + uid)
        .once('value')
        .then(snapshot => {
            let data = snapshot.val() || {};
            const key = `${monthIndex}-${year}`;

            if (data[key])
            { console.log("Month already exists!") }
            else
            { data[key] = monthToAdd }

            database.ref('users/' + uid).set(data);

            UpdateDataVariable();
        })
}

function EditData(month="1-2020", day=1, pomodoroCount=0)
{
    if (!firebase.auth().currentUser)
    {
        setTimeout(() => { EditData(month, day, pomodoroCount) }, 500);
        return;
    }

    const uid = firebase.auth().currentUser.uid;

    database
        .ref('/users/' + uid)
        .once('value')
        .then(snapshot => {
            let data = snapshot.val() || {};

            if (!data[month])
                data[month] = { "1": "0" }
            
            data[month][day] = pomodoroCount;
            database.ref('users/' + uid).set(data);

            UpdateDataVariable();
        })
}

function RemoveData(month=1, day=1)
{
    if (!firebase.auth().currentUser)
    {
        setTimeout(() => { RemoveData(month, day) }, 500);
        return;
    }

    const uid = firebase.auth().currentUser.uid;

    database
        .ref('/users/' + uid)
        .once('value')
        .then(snapshot => {
            let data = snapshot.val() || {};

            if (data[month][day] == null)
            { console.log("Data doesn't exists!") }
            else
            {
                data[month][day] = null;
                database.ref('users/' + uid).set(data);
                console.log("Redraw logs and graphs");
            }

            UpdateDataVariable();
        })
        .catch(error => console.log(error));
}

function RemoveMonth(month=1, year=2020)
{
    if (!firebase.auth().currentUser)
    {
        setTimeout(() => { RemoveMonth(month, year) }, 500);
        return;
    }

    const uid = firebase.auth().currentUser.uid;

    database
        .ref('/users/' + uid)
        .once('value')
        .then(snapshot => {
            let data = snapshot.val() || {};
            data[`${month}-${year}`] = {};
            database.ref('users/' + uid).set(data);

            UpdateDataVariable();

            if (Object.keys(data).length <= 1)
                ClearLogTable();
        });
}

function UpdateDataVariable()
{
    if (!firebase.auth().currentUser)
    {
        setTimeout(UpdateDataVariable, 500);
        return;
    }

    const uid = firebase.auth().currentUser.uid;

    database
        .ref('/users/' + uid)
        .once('value')
        .then(snapshot => {
            let existing = snapshot.val() || {};
            data = existing;

            const keys = Object.keys(data);
            
            if (keys.length <= activeLogMonthIndex || keys.length == 1)
                activeLogMonthIndex = 0;
            if (keys.length <= activeGraphMonthIndex || keys.length == 1)
                activeGraphMonthIndex = 0;

            ShowLogs(keys[activeLogMonthIndex]);
            ShowGraph(keys[activeGraphMonthIndex]);
            LogMonthSelectorButtons(activeLogMonthIndex);
            GraphMonthSelectorButtons(activeGraphMonthIndex);
        })
}

UpdateDataVariable(() => { console.log(data) });