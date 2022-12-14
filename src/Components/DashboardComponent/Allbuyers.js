import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AlartMessage from '../../Hooks/AlartMessage';
import SmallSpin from '../SmallSpin';

const Allbuyers = () => {
    const { successMessage } = AlartMessage()
    const url = `https://interverse.vercel.app/admin/users?role=buyer`
    const { data: allbyers = [], refetch, isLoading } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data.data
        }
    })
    const heandelDelete = id => {
        fetch(`https://interverse.vercel.app/user/admin/delete/${id}`, {
            method: "DELETE"
        }).then(res => res.json()).then(data => {
            successMessage('User Deleted')
            refetch()
        })
    }
    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <SmallSpin />
        </div>
    )
    return (
        <div className=''>
            <p className="text-2xl py-10 px-5">All Buyers</p>
            <div className="md:w-4/6 mx-auto">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>User Mail</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {allbyers.map((buyer, i) =>
                                <tr key={buyer._id}>
                                    <th> {i + 1} </th>
                                    <td>
                                        <div className="font-bold">{buyer.email}</div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => heandelDelete(buyer._id)}
                                            className="btn btn-sm btn-warning">delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default Allbuyers;