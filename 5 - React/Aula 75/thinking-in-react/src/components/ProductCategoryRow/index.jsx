export function ProductCategoryRow(props) {
    const category = props.category;
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );
}