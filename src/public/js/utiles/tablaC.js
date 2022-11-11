$("#addRow").on("click",function(){
    const tr = $("#tableBody .rows");
    text = `<tr class="rows" >
        <th scope="col">${tr.length + 1}</th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="text" class="form-control"></th>
        <th scope="col"><input type="text" class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" readonly class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" readonly class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" readonly class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" readonly class="form-control"></th>
        <th scope="col"><input type="number" class="form-control"></th>
        <th scope="col"><input type="number" readonly class="form-control"></th>
    </tr>`;
    $("#tableBody").append(text);
})
