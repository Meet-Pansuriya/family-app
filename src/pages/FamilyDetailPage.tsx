import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getFamilyById } from "../apis/familiesApi";
import { useAppContext } from "../contexts/AppContext";
import { Family } from "../types";

const FamilyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [family, setFamily] = useState<Family | undefined>(undefined);
  const { setLoading } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const family = await getFamilyById(id);
        console.log(family);
        family && setFamily(family);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setLoading]);

  if (!family) return null;

  // Function to get address information (fallback to head of family if needed)
  const getMemberAddress = (member: any) => {
    return {
      address: member.address || family.headOfFamily.address,
      village: member.village || family.headOfFamily.village,
      taluko: member.taluko || family.headOfFamily.taluko,
      district: member.district || family.headOfFamily.district,
    };
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold", color: "#27374D" }}
      >
        Family Details
      </Typography>

      {/* Grid Layout for Head of Family and Address Information */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ padding: 2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "600" }}>
                Head of Family
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {family.headOfFamily.name}
              </Typography>
              <Typography variant="body1">
                <strong>Contact:</strong> {family.headOfFamily.contactNumber}{" "}
                {family.headOfFamily.isWhatsApp ? "(WhatsApp)" : ""}
              </Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong>{" "}
                {family.headOfFamily.dateOfBirth}
              </Typography>
              <Typography variant="body1">
                <strong>Education:</strong> {family.headOfFamily.education}
              </Typography>
              <Typography variant="body1">
                <strong>Profession:</strong> {family.headOfFamily.profession}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ padding: 2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "600" }}>
                Address Information
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {family.address}
              </Typography>
              <Typography variant="body1">
                <strong>Village:</strong> {family.village}
              </Typography>
              <Typography variant="body1">
                <strong>Taluko:</strong> {family.taluko}
              </Typography>
              <Typography variant="body1">
                <strong>District:</strong> {family.district}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Family Members */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 2, fontWeight: "600", color: "#27374D" }}
      >
        Family Members
      </Typography>
      <Grid container spacing={3}>
        {family.members?.map((member, index) => {
          const memberAddress = getMemberAddress(member);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{ padding: 2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "600" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Relation:</strong> {member.relation}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Contact:</strong> {member.contactNumber}{" "}
                    {member.isWhatsApp ? "(WhatsApp)" : ""}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date of Birth:</strong> {member.dateOfBirth}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Education:</strong> {member.education}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Profession:</strong> {member.profession}
                  </Typography>

                  {/* Display the member's or head of family's address */}
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Address Information:</strong>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address:</strong> {memberAddress.address}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Village:</strong> {memberAddress.village}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Taluko:</strong> {memberAddress.taluko}
                  </Typography>
                  <Typography variant="body1">
                    <strong>District:</strong> {memberAddress.district}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/"
        sx={{ mt: 4, mb: 6, paddingX: 4, paddingY: 2 }}
      >
        Back to Family List
      </Button>
    </Container>
  );
};

export default FamilyDetailPage;
