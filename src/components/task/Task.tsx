'use client';

import { ITask } from '@/interface/todo.type';
import { FC, FormEventHandler, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from '../modal-add/Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/server/api';

interface IProps {
    task: ITask;
}

const Task: FC<IProps> = ({ task }) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskEdit, setTaskEdit] = useState<string>(task.text);

    const router = useRouter();

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await editTodo({ id: task.id, text: taskEdit });

        setOpenModalEdit(false);

        router.refresh();
    };

    const handleDelteTask = async (id: number | string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);

        router.refresh();
    };

    return (
        <tr>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit
                    onClick={() => setOpenModalEdit(true)}
                    cursor="pointer"
                    className="text-blue-500"
                    size={25}
                />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit task</h3>
                        <div className="modal-action">
                            <input
                                type="text"
                                placeholder="Type here"
                                value={taskEdit}
                                onChange={(e) => setTaskEdit(e.target.value)}
                                className="input input-bordered w-full"
                            />
                            <button type="submit" className="btn ">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2
                    onClick={() => setOpenModalDeleted(true)}
                    cursor="pointer"
                    className="text-red-500"
                    size={25}
                />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className="text-lg">Are your sure want to delete this task?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleDelteTask(task.id)} className="btn">
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

export default Task;
