import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getFamiliesWithPagination } from "../apis/familiesApi";
import { useAppContext } from "../contexts/AppContext";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { Family } from "../types";

const FamilyTable: React.FC<{ families: Family[] }> = ({ families }) => {
  const [hasMore, setHasMore] = useState(true);

  // const {} = useInfiniteScroll();
  // const { setLoading, setFamilies } = useAppContext();
  // const fetchMoreFamilies = async () => {
  //   if (hasMore) {
  //     setLoading(true);
  //     const { families: newFamilies, lastDocument } =
  //       await getFamiliesWithPagination(lastDoc, 10);
  //     setFamilies((prevFamilies) => [...prevFamilies, ...newFamilies]);
  //     setLastDoc(lastDocument);
  //     setHasMore(newFamilies.length > 0);
  //     setLoading(false);
  //   }
  // };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="filtered family table">
        <TableHead>
          <TableRow>
            <TableCell>Head of Family</TableCell>
            <TableCell>Village</TableCell>
            <TableCell>Taluko</TableCell>
            <TableCell>District</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {families.map((family) => (
            <TableRow key={family.id}>
              <TableCell>{family.headOfFamily.name}</TableCell>
              <TableCell>{family.village}</TableCell>
              <TableCell>{family.taluko}</TableCell>
              <TableCell>{family.district}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={`/family/${family.id}`}
                  size="small"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FamilyTable;
