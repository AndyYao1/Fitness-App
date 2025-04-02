import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Button, ListGroup } from "react-bootstrap";

function WorkoutsList(data){
    console.log(data)
    return(
        <Accordion>
            {data.workoutsData.map((workout) => (
            <Accordion.Item eventKey={workout.date}>
                <Accordion.Header> {workout.date} </Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        { workout.workouts.map((exercise) => (
                            <ListGroup.Item className='exerciseListItem'> 
                                {exercise.name}: {
                                Object.entries(exercise)
                                .filter(([key]) => key !== "name")
                                .map(([key, value]) => `${value} ${key}`)
                                .join(", ")} 
                                <Button className='removeExerciseBtn' size="sm" variant="danger"> Remove </Button>
                            </ListGroup.Item>
                        ))}
                    <ListGroup.Item> <Button size="sm">Add Exercise</Button> </ListGroup.Item>
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            ))}
        </Accordion>
    );
}

export default WorkoutsList;