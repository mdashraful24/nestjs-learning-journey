import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';

@Injectable()
export class TicketsService {
    private readonly tickets: Ticket[] = [
        {
            id: 1,
            subject: 'Cannot login to account',
            description: 'User cannot log in to the application.',
            priority: 'high',
            status: 'open',
            createdAt: '2026-10-11T10:00:00.000Z'
        },
        {
            id: 2,
            subject: 'Payment failed',
            description: 'User requests a dark mode option for the application.',
            priority: 'medium',
            status: 'open',
            createdAt: '2026-10-12T14:30:00.000Z'
        },
        {
            id: 3,
            subject: 'Invoice download not working',
            description: 'Payment processing fails for certain credit cards.',
            priority: 'low',
            status: 'closed',
            createdAt: '2026-10-13T09:15:00.000Z'
        }
    ];

    findAll(status?: Ticket['status'], priority?: Ticket['priority']) {
        let tickets = this.tickets;

        if (status) {
            tickets = tickets.filter((ticket) => ticket.status === status);
        }

        if (priority) {
            tickets = tickets.filter((ticket) => ticket.priority === priority);
        }

        return tickets;
    }
    findOne(id: number) {
        const ticket = this.tickets.find((ticket) => ticket.id === id);

        if (!ticket) {
            throw new NotFoundException(`Ticket with id ${id} not found`);
        }

        return ticket;
    }
}
