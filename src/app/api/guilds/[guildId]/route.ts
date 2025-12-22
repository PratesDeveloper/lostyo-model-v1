import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ guildId: string }> }
) {
  console.log('=== API GUILD CHECK START ===');
  
  try {
    const { guildId } = await params;
    console.log('Guild ID received:', guildId);

    if (!guildId) {
      console.log('Missing guild ID');
      return NextResponse.json(
        { error: 'Guild ID is required' },
        { status: 400 }
      );
    }

    console.log('Querying Supabase for guild:', guildId);
    
    const { data, error, status } = await supabase
      .from('guilds')
      .select('state')
      .eq('guild_id', guildId)
      .single();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      if (error.message.includes('relation "public.guilds" does not exist')) {
        console.log('Table guilds does not exist - need to create it');
        return NextResponse.json(
          { error: 'Table guilds does not exist in database' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch guild data', details: error.message },
        { status: 500 }
      );
    }

    console.log('Query successful, data:', data);

    if (!data) {
      console.log('Guild not found in database');
      return NextResponse.json(
        { error: 'Guild not found' },
        { status: 404 }
      );
    }

    console.log('=== API GUILD CHECK END - SUCCESS ===');
    return NextResponse.json({ state: data.state });

  } catch (error) {
    console.error('=== API GUILD CHECK ERROR ===');
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}