'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerUser } from '@/actions/course-27-actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Validating...' : 'Register'}
        </Button>
    );
}

export default function Course27Zod() {
    const [state, formAction] = useFormState(registerUser, { message: '', errors: {} });

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-lg">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">[Course 27] Type-Safe Validation</h1>
                <p className="text-muted-foreground">
                    使用 Zod 在 Server Action 中進行嚴格的資料驗證。
                </p>
            </div>

            <Card className={state.success ? "border-green-500 bg-green-50/20" : ""}>
                <CardHeader>
                    <CardTitle>Registration Form</CardTitle>
                    <CardDescription>
                        Try submitting invalid data (e.g., short name, wrong email).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">

                        {/* Username */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username (min 3)</Label>
                            <Input name="username" placeholder="John" />
                            {state.errors?.username && (
                                <p className="text-xs text-red-500">{state.errors.username[0]}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" placeholder="john@example.com" />
                            {state.errors?.email && (
                                <p className="text-xs text-red-500">{state.errors.email[0]}</p>
                            )}
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <Label htmlFor="age">Age (min 18)</Label>
                            <Input name="age" type="number" placeholder="25" />
                            {state.errors?.age && (
                                <p className="text-xs text-red-500">{state.errors.age[0]}</p>
                            )}
                        </div>

                        <SubmitButton />

                        {state.message && (
                            <div debug-data={state} className={`p-3 rounded text-sm text-center ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {state.message}
                            </div>
                        )}

                    </form>
                </CardContent>
            </Card>

        </div>
    );
}
