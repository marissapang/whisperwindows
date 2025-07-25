// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddb } from '@/app/libs/dynamodb';

const docClient = DynamoDBDocumentClient.from(ddb);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const command = new PutCommand({
    TableName: 'Orders',
    Item: body,
  });

  try {
    await docClient.send(command);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DynamoDB insert error:', err);
    return NextResponse.json({ success: false, error: 'Insert failed' }, { status: 500 });
  }
}
