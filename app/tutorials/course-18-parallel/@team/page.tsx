import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// 模擬資料
const MEMBERS = [
    { name: 'Alice', role: 'Frontend', initials: 'AL' },
    { name: 'Bob', role: 'Backend', initials: 'BO' },
    { name: 'Charlie', role: 'Designer', initials: 'CH' },
];

export default async function TeamPage() {
    // 模擬稍微延遲 (1s)
    await new Promise(resolve => setTimeout(resolve, 1000));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {MEMBERS.map((member) => (
                    <div key={member.name} className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
