import React from 'react'
import { Button } from '@radix-ui/themes'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'

interface UpdateButtonProps {
    id: number;
}

const UpdateButton = ({ id }: UpdateButtonProps) => {

    return (
        <Button size="1" color="teal" radius='full'>
            <Link href={`/issues/update/${id}`}><FaEdit /></Link>
        </Button>
    )
}

export default UpdateButton