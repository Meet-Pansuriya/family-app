import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { serverTimestamp } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFamily } from "../apis/familiesApi";
import { useAppContext } from "../contexts/AppContext";
import { Family, FamilyMember } from "../types";

const AddFamilyPage: React.FC = () => {
  const navigate = useNavigate();

  // Family state
  const [family, setFamily] = useState<Family>({
    headOfFamily: {
      name: "",
      relation: "Self",
      contactNumber: "",
      isWhatsApp: false,
      dateOfBirth: "",
      education: "",
      profession: "",
      address: "",
      village: "",
      taluko: "",
      district: "",
    },
    address: "",
    village: "",
    taluko: "",
    district: "",
    members: [],
    createdAt: serverTimestamp(),
  });

  const { relations, villages, talukos, districts } = useAppContext();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If no errors, proceed with form submission (e.g., send data to backend)
    console.log("Family data submitted:", family);
    try {
      await addFamily(family);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  // Handle changes for head of family
  const handleHeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFamily((prev) => ({
      ...prev,
      headOfFamily: {
        ...prev.headOfFamily,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  // Handle changes for address
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFamily((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a family member dynamically
  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      name: "",
      relation: "",
      contactNumber: "",
      isWhatsApp: false,
      dateOfBirth: "",
      education: "",
      profession: "",
      address: family.address,
      village: family.village,
      taluko: family.taluko,
      district: family.district,
    };

    setFamily((prev) => ({
      ...prev,
      members: [...(prev.members || []), newMember],
    }));
  };

  // Handle changes for family members
  const handleMemberChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFamily((prev) => {
      const updatedMembers = [...(prev.members || [])];
      updatedMembers[index] = {
        ...updatedMembers[index],
        [name]: type === "checkbox" ? checked : value,
      };
      return { ...prev, members: updatedMembers };
    });
  };

  // Remove a family member
  const removeMember = (index: number) => {
    setFamily((prev) => ({
      ...prev,
      members: prev.members?.filter((_, i) => i !== index),
    }));
  };

  return (
    <Container sx={{ p: 4 }} style={{ maxWidth: "560px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Family
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Head of Family
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            required
            label="Name"
            name="name"
            value={family.headOfFamily.name}
            onChange={handleHeadChange}
          />
          <TextField
            required
            label="Contact Number"
            name="contactNumber"
            value={family.headOfFamily.contactNumber}
            onChange={handleHeadChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={family.headOfFamily.isWhatsApp}
                onChange={handleHeadChange}
                name="isWhatsApp"
              />
            }
            label="Is WhatsApp Number"
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            mb: 2,
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={family.headOfFamily.dateOfBirth || ""}
            onChange={handleHeadChange}
          />
          <TextField
            fullWidth
            label="Education"
            name="education"
            value={family.headOfFamily.education || ""}
            onChange={handleHeadChange}
          />
        </Box>
        <TextField
          fullWidth
          label="Profession"
          name="profession"
          value={family.headOfFamily.profession || ""}
          onChange={handleHeadChange}
        />
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Address Information
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            rows={4}
            multiline
            required
            label="Address"
            name="address"
            value={family.address}
            onChange={handleAddressChange}
          />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Autocomplete
              options={villages}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} required label="Village" />
              )}
              fullWidth
              value={family.village}
              onChange={(_, newValue) =>
                setFamily((prev) => ({
                  ...prev,
                  village: newValue || "",
                  headOfFamily: {
                    ...prev.headOfFamily,
                    village: newValue || "",
                  },
                }))
              }
              onInputChange={(_, newInputValue) =>
                setFamily((prev) => ({
                  ...prev,
                  village: newInputValue,
                  headOfFamily: {
                    ...prev.headOfFamily,
                    village: newInputValue,
                  },
                }))
              }
            />

            <Autocomplete
              options={talukos}
              freeSolo
              fullWidth
              renderInput={(params) => (
                <TextField {...params} required label="Taluko" />
              )}
              value={family.taluko}
              onChange={(_, newValue) =>
                setFamily((prev) => ({
                  ...prev,
                  taluko: newValue || "",
                  headOfFamily: {
                    ...prev.headOfFamily,
                    taluko: newValue || "",
                  },
                }))
              }
              onInputChange={(_, newInputValue) =>
                setFamily((prev) => ({
                  ...prev,
                  taluko: newInputValue,
                  headOfFamily: { ...prev.headOfFamily, taluko: newInputValue },
                }))
              }
            />
          </Box>
          <Autocomplete
            options={districts}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} required label="District" />
            )}
            value={family.district}
            onChange={(_, newValue) =>
              setFamily((prev) => ({
                ...prev,
                district: newValue || "",
                headOfFamily: {
                  ...prev.headOfFamily,
                  district: newValue || "",
                },
              }))
            }
            onInputChange={(_, newInputValue) =>
              setFamily((prev) => ({
                ...prev,
                district: newInputValue,
                headOfFamily: { ...prev.headOfFamily, district: newInputValue },
              }))
            }
          />
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Family Members
        </Typography>
        {family.members?.map((member, index) => (
          <Box key={member.id} sx={{ mb: 2 }}>
            <Divider sx={{ my: 2 }} />
            <Button onClick={() => removeMember(index)} color="error">
              <DeleteIcon />
              <Typography mx={1} variant="button">
                Delete Member
              </Typography>
            </Button>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
                flexDirection: "column",
              }}
            >
              <TextField
                required
                label="Name"
                name="name"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
              <Autocomplete
                freeSolo
                fullWidth
                options={relations}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Relation to Head"
                    name="relation"
                    value={member.relation}
                    onChange={(e) =>
                      handleMemberChange(
                        index,
                        e as React.ChangeEvent<HTMLInputElement>
                      )
                    }
                  />
                )}
                value={member.relation}
                onInputChange={(_, newInputValue) =>
                  handleMemberChange(index, {
                    target: {
                      name: "relation",
                      value: newInputValue,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={member.contactNumber}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={member.isWhatsApp}
                    onChange={(e) =>
                      handleMemberChange(
                        index,
                        e as React.ChangeEvent<HTMLInputElement>
                      )
                    }
                    name="isWhatsApp"
                  />
                }
                label="Is WhatsApp Number"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                mb: 2,
                flexDirection: "row",
              }}
            >
              <TextField
                label="Date of Birth"
                fullWidth
                name="dateOfBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={member.dateOfBirth || ""}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
              <TextField
                fullWidth
                label="Education"
                name="education"
                value={member.education || ""}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Box>
            <TextField
              label="Profession"
              name="profession"
              fullWidth
              value={member.profession || ""}
              onChange={(e) =>
                handleMemberChange(
                  index,
                  e as React.ChangeEvent<HTMLInputElement>
                )
              }
            />
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Address Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                label="Address"
                name="address"
                rows={4}
                multiline
                value={member.address || family.address}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Autocomplete
                  freeSolo
                  options={villages}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Village"
                      name="village"
                      value={member.village || family.village}
                      onChange={(e) =>
                        handleMemberChange(
                          index,
                          e as React.ChangeEvent<HTMLInputElement>
                        )
                      }
                    />
                  )}
                  value={member.village || family.village}
                  onInputChange={(_, newInputValue) =>
                    handleMemberChange(index, {
                      target: {
                        name: "village",
                        value: newInputValue,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Autocomplete
                  freeSolo
                  fullWidth
                  options={talukos}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Taluko"
                      name="taluko"
                      value={member.taluko || family.taluko}
                      onChange={(e) =>
                        handleMemberChange(
                          index,
                          e as React.ChangeEvent<HTMLInputElement>
                        )
                      }
                    />
                  )}
                  value={member.taluko || family.taluko}
                  onInputChange={(_, newInputValue) =>
                    handleMemberChange(index, {
                      target: {
                        name: "taluko",
                        value: newInputValue,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              </Box>

              <Autocomplete
                freeSolo
                options={districts}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="District"
                    name="district"
                    value={member.district || family.district}
                    onChange={(e) =>
                      handleMemberChange(
                        index,
                        e as React.ChangeEvent<HTMLInputElement>
                      )
                    }
                  />
                )}
                value={member.district || family.district}
                onInputChange={(_, newInputValue) =>
                  handleMemberChange(index, {
                    target: {
                      name: "district",
                      value: newInputValue,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
            </Box>
          </Box>
        ))}
        <Button variant="outlined" onClick={addFamilyMember} sx={{ mt: 2 }}>
          Add Family Member
        </Button>

        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit Family
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddFamilyPage;
