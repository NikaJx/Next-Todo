import { ITask } from '@/interface/todo.type';
import { FC } from 'react';
import Task from '../task/Task';

interface IProps {
    tasks: ITask[];
}

const TodoList: FC<IProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
