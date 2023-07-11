export default function getSelectedTaskId(tableCollection) {
    const taskIdList = [];
    let checkState = false;
    let hasSelectedTask = false; // true when there are one task is selected
    tableCollection.forEach(task => {
        if (task.selectedState) {
            taskIdList.push(task.taskId);
            if (hasSelectedTask === false) {
                checkState = task.checkState;
                hasSelectedTask = true;
            }
        }
    });
    return {taskIdList, checkState};
} 