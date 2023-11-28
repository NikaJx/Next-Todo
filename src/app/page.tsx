import AddTask from '@/components/add-task/AddTask';
import TodoList from '@/components/todo-list/TodoList';
import { getAllTodos } from '@/server/api';

const Home = async () => {
    const tasks = await getAllTodos();

    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Todo List</h1>
                <AddTask />
            </div>
            <TodoList tasks={tasks} />
        </main>
    );
};

export default Home;
