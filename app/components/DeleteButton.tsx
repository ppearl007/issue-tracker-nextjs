'use client'

import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
    id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
    const router = useRouter()
    const [error, setError] = useState('')

    const handleDelete = async () => {
        try {
            await axios.delete(`api/issues/${id}/`)
            router.push('/issues')
        } catch (error) {
            console.error(error)
            setError('Issue failed to delete')
            alert('An error occurred while deleting the issue.');
        }
    }

    return (
        <Button size="1" color="ruby" radius='full' onClick={handleDelete}>
            <FaTrash />
        </Button>
    )
}

export default DeleteButton

