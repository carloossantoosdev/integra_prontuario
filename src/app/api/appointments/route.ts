import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(req: Request) {
    const url = new URL(req.url);
    const nome = url.searchParams.get("nome"); 
    const page = parseInt(url.searchParams.get("page") || "1", 10); 
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); 

    const skip = (page - 1) * limit; 

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                ...(nome && {
                    nome: {
                        contains: nome, 
                    },
                }),
            },
            skip: skip,
            take: limit,
        });

        const totalAppointments = await prisma.appointment.count({
            where: {
                ...(nome && {
                    nome: {
                        contains: nome, 
                    },
                }),
            },
        });

        return NextResponse.json({
            data: appointments,
            meta: {
                total: totalAppointments,
                page: page,
                limit: limit,
                totalPages: Math.ceil(totalAppointments / limit),
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar atendimentos:', error);
        return NextResponse.json({ error: 'Erro ao buscar atendimentos' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { 
            nome,
            data_nascimento,
            data_primeiro_atendimento,
            data_ultimo_atendimento,
            valor,
            condutas,
            observacoes,
            atendente
        } = data;

        const appointmentValue = parseFloat(valor);
        
        const appointment = await prisma.appointment.create({
            data: {
                nome,
                data_nascimento: new Date(data_nascimento),
                data_primeiro_atendimento: new Date(data_primeiro_atendimento),
                data_ultimo_atendimento: new Date(data_ultimo_atendimento),
                valor: appointmentValue, // Certifique-se de que é um número
                condutas,
                observacoes,
                atendente,
                ativo: true,
            },
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        console.error('Erro ao criar o atendimento:', error);
        return NextResponse.json({ error: 'Erro ao criar o atendimento' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, ...data } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
        }

        const appointmentValue = parseFloat(data.valor);

        const updatedAppointment = await prisma.appointment.update({
            where: { id: id }, 
            data: {
                nome: data.nome,
                data_nascimento: new Date(data.data_nascimento),
                data_primeiro_atendimento: new Date(data.data_primeiro_atendimento),
                data_ultimo_atendimento: new Date(data.data_ultimo_atendimento),
                valor: appointmentValue,
                condutas: data.condutas,
                observacoes: data.observacoes,
                atendente: data.atendente,
                ativo: true,
            },
        });

        return NextResponse.json(updatedAppointment, { status: 200 });
    } catch (error) {
        console.error('Erro ao atualizar o atendimento:', error);
        return NextResponse.json({ error: 'Erro ao atualizar o atendimento' }, { status: 500 });
    }
}

