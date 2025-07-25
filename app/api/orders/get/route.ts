import { NextRequest, NextResponse } from 'next/server';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ddb } from '@/app/libs/dynamodb';

const docClient = DynamoDBDocumentClient.from(ddb);

export async function POST(request: NextRequest) {
  try {
    const { Order_Id } = await request.json();

    if (!Order_Id) {
      return NextResponse.json({ success: false, error: 'Missing Order_Id' }, { status: 400 });
    }

    const result = await docClient.send(
      new GetCommand({
        TableName: 'Orders',
        Key: { Order_Id },
      })
    );

    if (!result.Item) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.Item });
  } catch (err) {
    console.error('DynamoDB error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
