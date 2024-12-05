<div class="box-adding-database">
    <div class="f1-database">
        <div class="flex-sb-align">
            <h1 class="f-s-20">SQLite Database</h1>
        </div>

    </div>

    {{-- +++box-add+++ --}}
    <div class="menu-box-database">
        <div class="main">
            <div class="flex-align gap10">
                <img class="small-img" src="/Icon/layer-icon.png" alt="">
                <h1>Tables</h1>
            </div>


            <div class="main">
                @foreach ($tableDetails as $tableName => $details)
                    <div class="flex-align gap10 table-name m-b-10">
                        <img class="small-img" src="/Icon/arrow-down.png" alt="">
                        <h1>{{ $tableName }}</h1>
                    </div>

                    <div class="main2 detail-table">
                        @foreach ($details['columns'] as $column)
                            <div class="flex-align gap10 m-tb-10">

                                @if ($column->type == 'varchar' || $column->type == 'TEXT')
                                    <img class="small-img" src="/Icon/abc.png" alt="Varchar/Text Icon">
                                @elseif ($column->type == 'INTEGER')
                                    <img class="small-img" src="/Icon/sharp.png" alt="Integer Icon">
                                @elseif ($column->type == 'datetime')
                                    <img class="small-img" src="/Icon/created-at.png" alt="Integer Icon">
                                @endif


                                <h1> {{ $column->name }}
                                    @if ($column->pk)
                                        - Primary Key
                                    @endif
                                </h1>

                                @if ($column->pk)
                                    <img class="small-img" src="/Icon/key.png" alt="Primary Key Icon">
                                @endif
                            </div>
                        @endforeach
                    </div>
                @endforeach
            </div>
        </div>



    </div>
</div>

<script>
    let tableNames = document.querySelectorAll('.table-name');

    tableNames.forEach(tableName => {
        tableName.onclick = function() {
            // Find the next sibling element which is the corresponding detail table
            let detailTable = tableName.nextElementSibling;

            // Toggle the 'active' class for this specific detail table
            detailTable.classList.toggle('active');
            tableName.classList.toggle('active');
        }
    });
</script>
