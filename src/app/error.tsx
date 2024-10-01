'use client'

import Error from '@/components/Error/Error'
import { useEffect } from 'react'

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<>
			<Error onClick={() => reset()} />
		</>
	)
}
