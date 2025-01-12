import React from 'react'
import Link from 'next/link'
import { Button, Box, Heading, Text, Flex } from '@radix-ui/themes'
import { prisma } from '@/prisma/client'
import { FaTrash } from "react-icons/fa";
import axios from 'axios'
import DeleteButton from '../components/DeleteButton';

const IssuesPage = async () => {

    const issues = await prisma.issue.findMany();

    return (
        <main>
            <Heading
                className='mb-5 text-zinc-900'
                as="h1"
            >
                Issue List
            </Heading>
            <Box>
                {issues.map((issue) => (
                    <Box
                        className='max-w-xl p-2 mb-2'
                        key={issue.id}
                        style={{ backgroundColor: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}
                    >
                        <Flex justify='between'>
                            <Box className=''>
                                <Text as="p" weight="bold" >{issue.title}</Text>
                                <Text size="2" as="p">{issue.description}</Text>
                                <Text size="1" as="p">{issue.status}</Text>
                            </Box>
                            <DeleteButton id={issue.id} />
                        </Flex>
                    </Box>
                ))}
            </Box>
            <div className='mt-5'>
                <Button>
                    <Link href='/issues/new'>New Issue</Link>
                </Button>
            </div>
        </main>
    )
}

export default IssuesPage