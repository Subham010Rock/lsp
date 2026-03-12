/**
 * Library presets — preconfigured code templates for popular UI/npm libraries.
 * When a user selects a library, the editor loads example code that imports
 * that library's components, triggering ATA to fetch its type definitions.
 */

export interface LibraryPreset {
  id: string;
  label: string;
  description: string;
  npmPackage: string;
  defaultCode: string;
}

export const LIBRARY_PRESETS: LibraryPreset[] = [
  {
    id: "none",
    label: "No Library",
    description: "Plain React + TypeScript",
    npmPackage: "",
    defaultCode: `import React, { useState } from 'react';

interface Props {
  title: string;
}

const App: React.FC<Props> = ({ title }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
};

export default App;
`,
  },
  {
    id: "react-bootstrap",
    label: "React Bootstrap",
    description: "Bootstrap components for React",
    npmPackage: "react-bootstrap",
    defaultCode: `import React, { useState } from 'react';
import { Button, Card, Badge, Container, Row, Col, Alert, Stack } from 'react-bootstrap';
import { Navbar, Nav, Form, InputGroup } from 'react-bootstrap';
import { Modal, Accordion, ListGroup, ProgressBar, Spinner } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <Container fluid>
      {/* Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline-light">Search</Button>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row className="g-4">
        {/* Stats Cards */}
        <Col md={4}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>
                Users <Badge bg="light" text="dark">142</Badge>
              </Card.Title>
              <Card.Text>Active users this month</Card.Text>
              <ProgressBar now={72} variant="light" />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>User signed up</ListGroup.Item>
                <ListGroup.Item>New order placed</ListGroup.Item>
                <ListGroup.Item>Payment received</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Stack gap={2}>
                <Alert variant="success">Deployment successful!</Alert>
                <Alert variant="warning">3 warnings found</Alert>
                <Button onClick={() => setShowModal(true)}>
                  View Details
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Accordion FAQ */}
      <Accordion className="mt-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to get started?</Accordion.Header>
          <Accordion.Body>Install react-bootstrap and import components.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Is it accessible?</Accordion.Header>
          <Accordion.Body>Yes, all components follow WAI-ARIA standards.</Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner animation="border" size="sm" /> Loading data...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
`,
  },
  {
    id: "mui",
    label: "Material UI (MUI)",
    description: "Google Material Design components",
    npmPackage: "@mui/material",
    defaultCode: `import React, { useState } from 'react';
import {
  Button, IconButton, TextField, Typography, Box, Paper, Grid,
  AppBar, Toolbar, Card, CardContent, CardActions, CardMedia,
  Chip, Avatar, Badge, LinearProgress, CircularProgress,
  Switch, Slider, Rating, Autocomplete, Alert, AlertTitle,
  Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, ListItemAvatar, ListItemIcon,
  Divider, Fab, Tooltip, Snackbar, Tab, Tabs, Stack
} from '@mui/material';

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(4);
  const [sliderValue, setSliderValue] = useState(30);
  const [darkMode, setDarkMode] = useState(false);

  const options = ['React', 'Angular', 'Vue', 'Svelte', 'Next.js'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MUI Dashboard
          </Typography>
          <Tooltip title="Toggle dark mode">
            <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
          </Tooltip>
          <Badge badgeContent={4} color="error">
            <IconButton color="inherit">🔔</IconButton>
          </Badge>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Paper sx={{ mt: 2 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered>
          <Tab label="Overview" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      <Box sx={{ p: 3 }}>
        {/* Alert */}
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Welcome!</AlertTitle>
          This dashboard demonstrates MUI components with full TypeScript support.
        </Alert>

        <Grid container spacing={3}>
          {/* Card with Media */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Project Stats</Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2">Completion</Typography>
                    <LinearProgress variant="determinate" value={72} />
                  </Box>
                  <Box>
                    <Typography variant="body2">Rating</Typography>
                    <Rating value={rating} onChange={(_, v) => setRating(v)} />
                  </Box>
                  <Box>
                    <Typography variant="body2">Priority: {sliderValue}%</Typography>
                    <Slider
                      value={sliderValue}
                      onChange={(_, v) => setSliderValue(v as number)}
                    />
                  </Box>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">Save</Button>
                <Button size="small" color="secondary">Reset</Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Form Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Quick Form</Typography>
              <Stack spacing={2}>
                <TextField label="Full Name" variant="outlined" fullWidth />
                <TextField label="Email" variant="outlined" type="email" fullWidth />
                <Autocomplete
                  options={options}
                  renderInput={(params) => (
                    <TextField {...params} label="Framework" />
                  )}
                />
                <Button variant="contained" fullWidth>Submit</Button>
              </Stack>
            </Paper>
          </Grid>

          {/* List Card */}
          <Grid item xs={12} md={4}>
            <Paper>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Alice" secondary="Online" />
                  <Chip label="Admin" color="primary" size="small" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>B</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Bob" secondary="Away" />
                  <Chip label="User" size="small" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* FAB */}
        <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}
             onClick={() => setDialogOpen(true)}>
          +
        </Fab>

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Create New Item</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Title" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setDialogOpen(false)}>Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
`,
  },
  {
    id: "chakra",
    label: "Chakra UI",
    description: "Accessible component library",
    npmPackage: "@chakra-ui/react",
    defaultCode: `import React, { useState } from 'react';
import {
  Box, Flex, Text, Heading, Button, IconButton,
  Input, Stack, HStack, VStack, SimpleGrid,
  Card, Badge, Avatar, Image, Divider,
  Alert, Progress, Spinner, Switch,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, ModalCloseButton,
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  Menu, MenuButton, MenuList, MenuItem,
  Tooltip, Tag, TagLabel, Stat, StatLabel,
  StatNumber, StatHelpText, StatArrow,
  useDisclosure, useColorMode
} from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}>
      {/* Header */}
      <Flex as="header" bg="purple.600" color="white" p={4} align="center" justify="space-between">
        <Heading size="md">Chakra Dashboard</Heading>
        <HStack spacing={4}>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="whiteAlpha.200"
            maxW="300px"
          />
          <Tooltip label="Toggle theme">
            <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
          </Tooltip>
          <Menu>
            <MenuButton as={Button} variant="ghost" color="white">
              <Avatar size="sm" name="User" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <Box p={6}>
        {/* Stats Row */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
          <Card.Root p={4}>
            <Stat>
              <StatLabel>Revenue</StatLabel>
              <StatNumber>$45,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" /> 12.5%
              </StatHelpText>
            </Stat>
          </Card.Root>

          <Card.Root p={4}>
            <Stat>
              <StatLabel>Users</StatLabel>
              <StatNumber>2,340</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" /> 8.1%
              </StatHelpText>
            </Stat>
          </Card.Root>

          <Card.Root p={4}>
            <Stat>
              <StatLabel>Conversion</StatLabel>
              <StatNumber>3.2%</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" /> 1.4%
              </StatHelpText>
            </Stat>
          </Card.Root>
        </SimpleGrid>

        {/* Alerts */}
        <Stack spacing={3} mb={6}>
          <Alert.Root status="success">
            <Alert.Title>Deployment successful!</Alert.Title>
          </Alert.Root>
          <Alert.Root status="warning">
            <Alert.Title>3 warnings found in build.</Alert.Title>
          </Alert.Root>
        </Stack>

        {/* Tabs */}
        <Card.Root>
          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
              <Tabs.Trigger value="team">Team</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="overview">
              <Box p={4}>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontWeight="bold">Project Alpha</Text>
                    <HStack>
                      <Tag colorScheme="green"><TagLabel>Active</TagLabel></Tag>
                      <Badge colorScheme="purple">v2.1</Badge>
                    </HStack>
                  </HStack>
                  <Progress value={72} colorScheme="purple" borderRadius="md" />

                  <HStack justify="space-between">
                    <Text fontWeight="bold">Project Beta</Text>
                    <Tag colorScheme="yellow"><TagLabel>In Progress</TagLabel></Tag>
                  </HStack>
                  <Progress value={45} colorScheme="blue" borderRadius="md" />
                </VStack>
              </Box>
            </Tabs.Content>

            <Tabs.Content value="team">
              <Box p={4}>
                <VStack spacing={3}>
                  {['Alice', 'Bob', 'Charlie'].map(name => (
                    <Flex key={name} w="100%" align="center" justify="space-between">
                      <HStack>
                        <Avatar size="sm" name={name} />
                        <Text>{name}</Text>
                      </HStack>
                      <Button size="sm" variant="outline">View Profile</Button>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Card.Root>

        {/* Action Buttons */}
        <HStack mt={6} spacing={4}>
          <Button colorScheme="purple" onClick={onModalOpen}>New Project</Button>
          <Button variant="outline" onClick={onDrawerOpen}>Open Sidebar</Button>
        </HStack>
      </Box>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input placeholder="Project name" />
              <Input placeholder="Description" />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onModalClose}>Cancel</Button>
            <Button colorScheme="purple">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={2}>
              <Button variant="ghost" justifyContent="start">Dashboard</Button>
              <Button variant="ghost" justifyContent="start">Projects</Button>
              <Button variant="ghost" justifyContent="start">Team</Button>
              <Divider />
              <Button variant="ghost" justifyContent="start">Settings</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Dashboard;
`,
  },
  {
    id: "antd",
    label: "Ant Design",
    description: "Enterprise-level UI components",
    npmPackage: "antd",
    defaultCode: `import React, { useState } from 'react';
import {
  Button, Space, Card, Typography, Input, Select, Table,
  Tag, Avatar, Badge, Progress, Statistic, Row, Col,
  Tabs, Form, Switch, DatePicker, TimePicker,
  Modal, Drawer, Alert, notification, message,
  Menu, Dropdown, Breadcrumb, Layout, Divider,
  List, Steps, Timeline, Rate, Tooltip, Popconfirm
} from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  name: string;
  status: string;
  progress: number;
}

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [current, setCurrent] = useState(1);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (val: number) => <Progress percent={val} size="small" />,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link">Edit</Button>
          <Popconfirm title="Delete?" onConfirm={() => message.success('Deleted')}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    { key: '1', name: 'Project Alpha', status: 'Active', progress: 82 },
    { key: '2', name: 'Project Beta', status: 'Pending', progress: 45 },
    { key: '3', name: 'Project Gamma', status: 'Active', progress: 91 },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>Ant Design App</Title>
        <Space>
          <Search placeholder="Search..." style={{ width: 250 }} />
          <Badge count={5}>
            <Avatar shape="square">U</Avatar>
          </Badge>
        </Space>
      </Header>

      <Content style={{ padding: 24 }}>
        {/* Stats */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic title="Total Users" value={1128} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Revenue" value={93825} prefix="$" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Growth" value={12.5} suffix="%" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Rate defaultValue={4} />
              <br />
              <Text type="secondary">Customer Rating</Text>
            </Card>
          </Col>
        </Row>

        {/* Alert */}
        <Alert
          message="Welcome to Ant Design"
          description="Full TypeScript support with intelligent autocomplete."
          type="info"
          showIcon
          closable
          style={{ marginBottom: 16 }}
        />

        {/* Table */}
        <Card title="Projects" extra={
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + New Project
          </Button>
        }>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </Card>

        {/* Steps */}
        <Card title="Deployment Pipeline" style={{ marginTop: 16 }}>
          <Steps current={current} onChange={setCurrent}>
            <Steps.Step title="Build" description="Compiling..." />
            <Steps.Step title="Test" description="Running tests" />
            <Steps.Step title="Deploy" description="Publishing" />
          </Steps>
        </Card>
      </Content>

      {/* Modal */}
      <Modal title="New Project" open={modalOpen} onCancel={() => setModalOpen(false)}>
        <Form layout="vertical">
          <Form.Item label="Name"><Input /></Form.Item>
          <Form.Item label="Category">
            <Select defaultValue="web">
              <Option value="web">Web</Option>
              <Option value="mobile">Mobile</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Deadline"><DatePicker style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;
`,
  },
  {
    id: "headless",
    label: "Headless UI + Tailwind",
    description: "Unstyled accessible components",
    npmPackage: "@headlessui/react",
    defaultCode: `import React, { useState, Fragment } from 'react';
import {
  Dialog, Transition, Menu, Listbox, Switch, Combobox,
  Disclosure, Popover, RadioGroup, Tab
} from '@headlessui/react';

const plans = [
  { name: 'Starter', ram: '2GB', cpu: '2 cores', price: '$10/mo' },
  { name: 'Business', ram: '8GB', cpu: '4 cores', price: '$40/mo' },
  { name: 'Enterprise', ram: '32GB', cpu: '8 cores', price: '$120/mo' },
];

const people = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'Diana Prince' },
];

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState(plans[0]);
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople = query === ''
    ? people
    : people.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1>Headless UI Components</h1>

      {/* Switch */}
      <div style={{ marginBottom: 24 }}>
        <h3>Switch</h3>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          style={{
            background: enabled ? '#6366f1' : '#ccc',
            width: 48, height: 24, borderRadius: 12,
            position: 'relative', border: 'none', cursor: 'pointer',
          }}
        >
          <span style={{
            display: 'block', width: 20, height: 20, borderRadius: '50%',
            background: 'white', position: 'absolute', top: 2,
            left: enabled ? 26 : 2, transition: 'left 0.2s',
          }} />
        </Switch>
        <span> Notifications: {enabled ? 'ON' : 'OFF'}</span>
      </div>

      {/* Listbox (Select) */}
      <div style={{ marginBottom: 24 }}>
        <h3>Listbox (Select)</h3>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6 }}>
            {selectedPerson.name}
          </Listbox.Button>
          <Listbox.Options style={{ border: '1px solid #ccc', borderRadius: 6, marginTop: 4, listStyle: 'none', padding: 0 }}>
            {people.map((person) => (
              <Listbox.Option key={person.id} value={person} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      {/* RadioGroup */}
      <div style={{ marginBottom: 24 }}>
        <h3>Radio Group — Select a Plan</h3>
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label>Server size:</RadioGroup.Label>
          {plans.map((plan) => (
            <RadioGroup.Option key={plan.name} value={plan} style={{
              padding: 16, margin: '8px 0', border: '2px solid',
              borderColor: selected.name === plan.name ? '#6366f1' : '#e5e7eb',
              borderRadius: 8, cursor: 'pointer',
            }}>
              <strong>{plan.name}</strong> — {plan.cpu}, {plan.ram}, {plan.price}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>

      {/* Disclosure (Accordion) */}
      <div style={{ marginBottom: 24 }}>
        <h3>Disclosure (Accordion)</h3>
        {['What is Headless UI?', 'Is it accessible?', 'Does it work with Tailwind?'].map((q) => (
          <Disclosure key={q}>
            <Disclosure.Button style={{ display: 'block', width: '100%', padding: 12, textAlign: 'left', border: '1px solid #e5e7eb', marginBottom: 4 }}>
              {q}
            </Disclosure.Button>
            <Disclosure.Panel style={{ padding: 12, background: '#f9fafb' }}>
              Yes! Headless UI provides unstyled, accessible components.
            </Disclosure.Panel>
          </Disclosure>
        ))}
      </div>

      {/* Dialog Button */}
      <button onClick={() => setIsOpen(true)} style={{ padding: '8px 24px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
        Open Dialog
      </button>

      {/* Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Dialog.Panel style={{ background: 'white', padding: 24, borderRadius: 12, maxWidth: 400 }}>
              <Dialog.Title style={{ fontSize: 18, fontWeight: 'bold' }}>Confirm Action</Dialog.Title>
              <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button onClick={() => setIsOpen(false)} style={{ padding: '6px 16px' }}>Cancel</button>
                <button onClick={() => setIsOpen(false)} style={{ padding: '6px 16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 4 }}>Confirm</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default App;
`,
  },
  {
    id: "framer-motion",
    label: "Framer Motion",
    description: "Animation library for React",
    npmPackage: "framer-motion",
    defaultCode: `import React, { useState } from 'react';
import {
  motion, AnimatePresence, useScroll, useTransform,
  useSpring, useMotionValue, useAnimationControls,
  LayoutGroup
} from 'framer-motion';

const cards = [
  { id: 1, title: 'Design', color: '#6366f1' },
  { id: 2, title: 'Develop', color: '#ec4899' },
  { id: 3, title: 'Deploy', color: '#14b8a6' },
];

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const background = useTransform(x, [-100, 0, 100], ['#ff008c', '#7700ff', '#00d4ff']);

  const handleShuffle = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        Framer Motion Showcase
      </motion.h1>

      {/* Hover & Tap animations */}
      <h3>Interactive Cards</h3>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layoutId={\`card-\${card.id}\`}
            onClick={() => setSelectedId(card.id)}
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: card.color, padding: 24, borderRadius: 12,
              color: 'white', cursor: 'pointer', flex: 1, textAlign: 'center',
            }}
          >
            <motion.h4>{card.title}</motion.h4>
          </motion.div>
        ))}
      </div>

      {/* AnimatePresence for mount/unmount */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={\`card-\${selectedId}\`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{
              position: 'fixed', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)', zIndex: 10,
            }}
          >
            <motion.div
              style={{
                background: cards.find(c => c.id === selectedId)?.color,
                padding: 48, borderRadius: 16, color: 'white', minWidth: 300,
                textAlign: 'center',
              }}
            >
              <h2>{cards.find(c => c.id === selectedId)?.title}</h2>
              <p>Click anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag */}
      <h3>Drag Me</h3>
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
        style={{ x, background, width: 150, height: 150, borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 'bold', cursor: 'grab', marginBottom: 32,
        }}
      >
        Drag
      </motion.div>

      {/* List reorder animation */}
      <h3>Animated List Shuffle</h3>
      <button onClick={handleShuffle} style={{ marginBottom: 16, padding: '8px 16px' }}>
        Shuffle
      </button>
      <LayoutGroup>
        <div style={{ display: 'flex', gap: 8 }}>
          {items.map((item) => (
            <motion.div
              key={item}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                width: 60, height: 60, borderRadius: 8,
                background: \`hsl(\${item * 60}, 70%, 60%)\`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 'bold', fontSize: 20,
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </LayoutGroup>

      {/* Staggered children */}
      <h3 style={{ marginTop: 32 }}>Staggered Animation</h3>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        style={{ listStyle: 'none', padding: 0 }}
      >
        {['React', 'TypeScript', 'Framer Motion', 'Monaco Editor', 'Vite'].map((tech) => (
          <motion.li
            key={tech}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            style={{ padding: 12, background: '#f3f4f6', marginBottom: 4, borderRadius: 6 }}
          >
            {tech}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default App;
`,
  },
];

/**
 * Get a library preset by ID
 */
export function getLibraryPreset(id: string): LibraryPreset | undefined {
  return LIBRARY_PRESETS.find((l) => l.id === id);
}

/**
 * Get all library IDs
 */
export function getLibraryIds(): string[] {
  return LIBRARY_PRESETS.map((l) => l.id);
}
