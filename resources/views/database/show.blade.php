@extends('database.layouts.sqlite')

@section('content')
    <div class="flex">


        <div class="sqlite-database">
            <div class="title-database">
                <h1 class="f-s-20">SQLite Database</h1>
            </div>

            <div class="main">
                <div class="flex-align gap10">
                    <img class="small-img" src="Icon/layer-icon.png" alt="">
                    <h1>Tables</h1>
                </div>


                <div class="main">
                    @foreach ($tableDetails as $tableName => $details)
                        <div class="flex-align gap10 table-name" data-table="{{ $tableName }}">
                            <img class="small-img" src="Icon/arrow-down.png" alt="">
                            <h1>{{ $tableName }}</h1>
                        </div>

                        <div class="main2 detail-table">
                            @foreach ($details['columns'] as $column)
                                <div class="flex-align gap10">
                                    @if ($column->type == 'varchar' || $column->type == 'TEXT')
                                        <img class="small-img" src="Icon/abc.png" alt="Varchar/Text Icon">
                                    @elseif ($column->type == 'INTEGER')
                                        <img class="small-img" src="Icon/sharp.png" alt="Integer Icon">
                                    @elseif ($column->type == 'datetime')
                                        <img class="small-img" src="Icon/created-at.png" alt="Datetime Icon">
                                    @endif

                                    <h1>{{ $column->name }} - {{ $column->type }}
                                        {{ $column->notnull ? 'NOT NULL' : 'NULLABLE' }}
                                        @if ($column->pk)
                                            - Primary Key
                                        @endif
                                    </h1>

                                    @if ($column->pk)
                                        <img class="small-img" src="Icon/key.png" alt="Primary Key Icon">
                                    @endif
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                </div>
            </div>
        </div>


        <div class="data-type">
            <header class="flex-align gap10">
                <img class="small-img" src="Icon/key.png" alt="Primary Key Icon">
                <h1>Rows: 0</h1>
            </header>

            <div class="flex-grow">
                <div class="scroll-x">


                    @foreach ($tableDetails as $tableName => $details)
                        <ul class="column-data {{ $loop->first ? 'active' : '' }}" data-table="{{ $tableName }}">
                            <div class="empty-box"></div>
                            @foreach ($details['columns'] as $column)
                                <li class="flex-sb-align">
                                    {{ $column->name }}

                                    <div class="div">
                                        @if ($column->type == 'varchar' || $column->type == 'TEXT')
                                            <img class="small-img" src="Icon/abc.png" alt="Varchar/Text Icon">
                                        @elseif ($column->type == 'INTEGER')
                                            <img class="small-img" src="Icon/sharp.png" alt="Integer Icon">
                                        @elseif ($column->type == 'datetime')
                                            <img class="small-img" src="Icon/created-at.png" alt="Datetime Icon">
                                        @endif

                                        @if ($column->pk)
                                            <img class="small-img" src="Icon/key.png" alt="Primary Key Icon">
                                        @endif
                                    </div>
                                </li>
                            @endforeach
                        </ul>

                        @foreach ($details['rows'] as $row)
                            <ul class="column-values" data-table="{{ $tableName }}">
                                <div class="empty-box"></div>
                                @foreach ($details['columns'] as $column)
                                    <!-- New UL for Column Data under each column -->
                                    <li class="flex-sb-align">{{ $row->{$column->name} }}</li>
                                @endforeach
                            </ul>
                        @endforeach




                        {{-- @foreach ($details['rows'] as $row)
                            <ul class="column-values flex-sb-align {{ $loop->first ? 'active' : '' }}"
                                data-table="{{ $tableName }}">
                                <!-- For each row, iterate over columns to display all values on the same line -->
                                @foreach ($details['columns'] as $column)
                                    <li class="flex-sb-align">
                                        {{ $row->{$column->name} }}

                                    </li>
                                @endforeach
                            </ul>
                        @endforeach --}}
                    @endforeach


                </div>
            </div>
        </div>
    </div>
@endsection


{{-- 
<ul>
    @foreach ($details['columns'] as $column)
        <li>
            {{ $column->name }} - {{ $column->type }} -
            {{ $column->notnull ? 'NOT NULL' : 'NULLABLE' }}
            @if ($column->pk)
                - Primary Key
            @endif
        </li>
    @endforeach
</ul>
 --}}





{{-- @foreach ($tableDetails as $tableName => $details)
    <div class="flex-align gap10 table-name">
        <img class="small-img" src="Icon/arrow-down.png" alt="">
        <h1>{{ $tableName }}</h1>
    </div>

    <div class="main2 detail-table">
        @foreach ($details['columns'] as $column)
            <div class="flex-align gap10">
                <!-- Check if column type is varchar or text -->
                @if ($column->type == 'varchar' || $column->type == 'text')
                    <img class="small-img" src="Icon/varchar-text-icon.png" alt="Varchar/Text Icon">
                @elseif ($column->type == 'integer')
                    <img class="small-img" src="Icon/integer-icon.png" alt="Integer Icon">
                @endif

                <!-- Check if it's a primary key -->
                @if ($column->pk)
                    <img class="small-img" src="Icon/primary-key-icon.png" alt="Primary Key Icon">
                @endif
                
                <h1>{{ $column->name }} - {{ $column->type }}
                    @if ($column->pk)
                        - Primary Key
                    @endif
                </h1>
            </div>
        @endforeach

        
    </div>
@endforeach --}}


{{-- @if (count($details['foreignKeys']) > 0)
<h3>Foreign Keys:</h3>
<ul>
    @foreach ($details['foreignKeys'] as $key)
        <li>Column {{ $key->from }} references {{ $key->table }}({{ $key->to }})</li>
    @endforeach
</ul>
@else
<p>No Foreign Keys</p>
@endif --}}
