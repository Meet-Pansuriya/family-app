import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import FamilyTable from "../components/FamilyTable";
import { useAppContext } from "../contexts/AppContext";
import { Family } from "../types";

const FilterFamiliesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filteredFamilies, setFilteredFamilies] = useState<Family[]>([]); // Filtered families
  const { families } = useAppContext();

  useEffect(() => {
    setFilteredFamilies(families); // Initialize filtered families
  }, [families]);

  // Update the search term and filter families
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filtered = families.filter(
      (family) =>
        family.headOfFamily.name.toLowerCase().includes(value) ||
        family.headOfFamily.contactNumber?.toLowerCase().includes(value) ||
        family.village?.toLowerCase().includes(value) ||
        family.taluko?.toLowerCase().includes(value) ||
        family.district?.toLowerCase().includes(value)
    );
    setFilteredFamilies(filtered);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Families
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          name="search"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          sx={{ mr: 1, mb: 1 }}
        />
      </Box>
      <FamilyTable families={filteredFamilies} />
    </Container>
  );
};

export default FilterFamiliesPage;
