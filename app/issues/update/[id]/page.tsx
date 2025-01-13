'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, TextArea, Text, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from "zod"

type IssueForm = z.infer<typeof createIssueSchema>

interface UpdateButtonProps {
    id: number;
}

const UpdateIssuePage = ({ params }: any) => {

    const { id }: UpdateButtonProps = React.use(params)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')

    const fetchItem = async () => {
        const response = await axios.get(`/api/issues/${id}`)

        if (response.statusText === "OK") {
            const { issue } = await response.data;
            setTitle(issue.title);
            setDescription(issue.description);
        } else {
            console.error('Failed to fetch issue data');
        }
    }

    useEffect(() => {
        fetchItem();
    }, []);

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axios.put(`/api/issues/${id}`, data)
            router.push('/issues')
        } catch (error) {
            setError('An unexpected error occured')
        }
    })

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className='space-y-3'
                onSubmit={onSubmit}>
                <TextField.Root placeholder="Title" {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Button>Update Issue</Button>
            </form>
        </div>
    )
}

export default UpdateIssuePage