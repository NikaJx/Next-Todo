'use client';

import { FormEventHandler, useState } from 'react';
import Modal from '../modal-add/Modal';
import { addTodo } from '@/server/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>('');

    const router = useRouter();

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (newTaskValue === '') {
            alert('Please enter text');
            setModalOpen(true);
        } else {
            await addTodo({ id: uuidv4(), text: newTaskValue });
        }

        setNewTaskValue('');
        setModalOpen(false);

        router.refresh();
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                Add new task
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className="font-bold text-lg">Add new task</h3>
                    <div className="modal-action">
                        <input
                            type="text"
                            placeholder="Type here"
                            value={newTaskValue}
                            onChange={(e) => setNewTaskValue(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn ">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddTask;
