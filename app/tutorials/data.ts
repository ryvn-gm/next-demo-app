export type Course = {
    id: string;
    title: string;
    description: string;
    path: string;
    phase: string;
};

export const COURSES: Course[] = [
    // Phase 1
    { id: '01', title: 'useState', description: 'State management basics', path: '/tutorials/course-01-usestate', phase: 'Phase 1: React Basics' },
    { id: '02', title: 'useEffect', description: 'Side effects & Cleanup', path: '/tutorials/course-02-useeffect', phase: 'Phase 1: React Basics' },
    { id: '03', title: 'Props', description: 'Component communication', path: '/tutorials/course-03-props', phase: 'Phase 1: React Basics' },

    // Phase 2
    { id: '04', title: 'Event Handling', description: 'Forms & Interaction', path: '/tutorials/course-04-events', phase: 'Phase 2: Events & Refs' },
    { id: '05', title: 'useRef', description: 'DOM access & Mutable vars', path: '/tutorials/course-05-refs', phase: 'Phase 2: Events & Refs' },

    // Phase 3
    { id: '06', title: 'useContext', description: 'Global Theme State', path: '/tutorials/course-06-context', phase: 'Phase 3: Advanced Hooks' },
    { id: '07', title: 'Custom Hooks', description: 'Reusing logic', path: '/tutorials/course-07-custom-hooks', phase: 'Phase 3: Advanced Hooks' },

    // Phase 4
    { id: '08', title: 'Routing', description: 'File-system routing', path: '/tutorials/course-08-routing', phase: 'Phase 4: Next.js Routing' },
    { id: '09', title: 'Navigation', description: 'Link & SearchParams', path: '/tutorials/course-09-navigation', phase: 'Phase 4: Next.js Routing' },

    // Phase 5
    { id: '10', title: 'Server vs Client', description: 'RSC Concepts', path: '/tutorials/course-10-server-vs-client', phase: 'Phase 5: App Router Core' },
    { id: '11', title: 'Data Fetching', description: 'Async Server Comps', path: '/tutorials/course-11-fetching', phase: 'Phase 5: App Router Core' },
    { id: '12', title: 'Loading', description: 'Suspense & Streaming', path: '/tutorials/course-12-loading', phase: 'Phase 5: App Router Core' },
    { id: '13', title: 'Error Handling', description: 'Error Boundaries', path: '/tutorials/course-13-error', phase: 'Phase 5: App Router Core' },
    { id: '14', title: 'Server Actions', description: 'Mutations', path: '/tutorials/course-14-server-actions', phase: 'Phase 5: App Router Core' },

    // Phase 6
    { id: '15', title: 'React.memo', description: 'Prevent Re-renders', path: '/tutorials/course-15-memo', phase: 'Phase 6: React Performance' },
    { id: '16', title: 'useMemo', description: 'Cache Calculations', path: '/tutorials/course-16-usememo', phase: 'Phase 6: React Performance' },
    { id: '17', title: 'useCallback', description: 'Stable Functions', path: '/tutorials/course-17-usecallback', phase: 'Phase 6: React Performance' },

    // Phase 7
    { id: '18', title: 'Parallel Routes', description: 'Slots (@team)', path: '/tutorials/course-18-parallel', phase: 'Phase 7: Advanced App Router' },
    { id: '19', title: 'Intercepting', description: 'Modal Routes', path: '/tutorials/course-19-intercepting', phase: 'Phase 7: Advanced App Router' },
    { id: '20', title: 'Route Handlers', description: 'API Endpoints', path: '/tutorials/course-20-route-handlers', phase: 'Phase 7: Advanced App Router' },
    { id: '21', title: 'Middleware', description: 'Edge Interceptors', path: '/tutorials/course-21-middleware', phase: 'Phase 7: Advanced App Router' },

    // Phase 8
    { id: '22', title: 'Dynamic API', description: 'GET/POST/DELETE [id]', path: '/tutorials/course-22-api-dynamic', phase: 'Phase 8: Backend Caps' },
    { id: '23', title: 'Headers & Cookies', description: 'Backend Context', path: '/tutorials/course-23-headers', phase: 'Phase 8: Backend Caps' },
    { id: '24', title: 'Redirects', description: 'Server Navigation', path: '/tutorials/course-24-redirect', phase: 'Phase 8: Backend Caps' },

    // Phase 9
    { id: '25', title: 'Caching', description: 'Data Cache Control', path: '/tutorials/course-25-caching', phase: 'Phase 9: Data Strategy' },
    { id: '26', title: 'Revalidation', description: 'ISR (On-Demand)', path: '/tutorials/course-26-revalidation', phase: 'Phase 9: Data Strategy' },
    { id: '27', title: 'Zod Validation', description: 'Type-Safe Actions', path: '/tutorials/course-27-zod', phase: 'Phase 9: Data Strategy' },

    // Phase 10
    { id: '28', title: 'React Hook Form', description: 'Advanced Forms', path: '/tutorials/course-28-react-hook-form', phase: 'Phase 10: Ecosystem' },
    { id: '29', title: 'Zustand', description: 'Global State', path: '/tutorials/course-29-zustand', phase: 'Phase 10: Ecosystem' },
    { id: '30', title: 'Compound Comp', description: 'Advanced Patterns', path: '/tutorials/course-30-compound', phase: 'Phase 10: Ecosystem' },

    // Phase 11
    { id: '31', title: 'Unit Testing', description: 'Vitest + RTL', path: '/tutorials/course-31-testing', phase: 'Phase 11: Testing' },
    { id: '32', title: 'E2E Testing', description: 'Playwright Concept', path: '/tutorials/course-32-e2e', phase: 'Phase 11: Testing' },
];

export const PHASES = Array.from(new Set(COURSES.map(c => c.phase)));
