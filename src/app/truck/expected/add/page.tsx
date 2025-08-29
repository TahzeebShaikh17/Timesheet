/* eslint-disable */
'use client';

import { useState } from 'react';
import { Button, TextInput, CustomSelect, Label } from '@/components/form';
import MainLayout from '@/components/layout/truck/MainLayout';

interface Organization {
    value: string;
    label: string;
}

interface Capacity {
    value: string;
    label: string;
}

interface TransferType {
    value: string;
    label: string;
}

interface MaterialType {
    value: string;
    label: string;
}

const organizations: Organization[] = [
    { value: '', label: 'Select Organization' },
    { value: '1', label: 'LFZ_Admin' },
    { value: '2', label: 'KT' },
    { value: '3', label: 'RAFFLES' },
    { value: '4', label: 'BHN' },
    { value: '5', label: 'TGARLA' },
    { value: '6', label: 'INSIGNIA' },
    { value: '7', label: 'LEKKI PORT' },
    { value: '8', label: 'LFTZ' },
    { value: '10', label: 'CHEC' },
    { value: '11', label: 'SANA' },
    { value: '12', label: 'MCPL_S&D' },
    { value: '13', label: 'LOUIS BERGER' },
    { value: '15', label: 'TG COLGATE' },
    { value: '16', label: 'TOLARAM AFRICA LFTZ ENTERPRISE' },
    { value: '17', label: 'CNC' },
    { value: '18', label: 'BASF' },
    { value: '19', label: 'EDLE' },
    { value: '21', label: 'Solynta Energy' },
    { value: '23', label: 'LFT NG' },
    { value: '24', label: 'LOGICHEM' },
    { value: '25', label: 'DH' },
    { value: '36', label: 'GPL' },
    { value: '37', label: 'OE-LFZ' },
    { value: '38', label: 'TATA' },
    { value: '39', label: 'SM-FZE' },
    { value: '40', label: 'GUC' },
    { value: '41', label: 'ADM' },
    { value: '42', label: 'E8S' },
    { value: '43', label: 'SFS-LFZ' },
    { value: '44', label: 'DEC' },
    { value: '45', label: 'BCFIBER' },
    { value: '47', label: 'ALS-FZE' },
];

const capacities: Capacity[] = [
    { value: '', label: 'Select Capacity' },
    { value: '1', label: '10 tons' },
    { value: '2', label: '15 tons' },
    { value: '3', label: '20 tons' },
    { value: '4', label: '25 tons' },
    { value: '5', label: '30 tons' },
    { value: '6', label: '40 tons' },
    { value: '7', label: '> 40 tons' },
];

const transferTypes: TransferType[] = [
    { value: '', label: 'Select Transfer Type' },
    { value: '11', label: 'Import to LFTZ' },
    { value: '12', label: 'Export from LFTZ' },
    { value: '31', label: 'Both' },
];

const materialTypes: MaterialType[] = [
    { value: '', label: 'Select Material Type' },
    { value: '22', label: 'Solid' },
    { value: '23', label: 'Liquid' },
    { value: '24', label: 'Inflammable' },
    { value: '25', label: 'Hazardous' },
    { value: '26', label: 'Non - Hazardous' },
    { value: '27', label: 'Non - Inflammable' },
    { value: '28', label: 'Gas' },
];

export default function AddExpectedTruck() {
    const [formData, setFormData] = useState({
        truckNo: '',
        organizationId: '',
        capacityId: '',
        transferTypeId: '',
        transportName: '',
        transportNo: '',
        driverName: '',
        driverNo: '',
        materialType: '',
        materialGoods: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Add your form submission logic here
            console.log('Form submitted:', formData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MainLayout>
            <div className="form-container">
                <div className="form-header">
                    <h1>Add Expected Truck</h1>
                    <p>Enter truck and driver details for check-in process</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">
                                Truck No. <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter truck number (e.g., ABC-123)"
                                value={formData.truckNo}
                                onChange={(e) => setFormData({ ...formData, truckNo: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Called By Organization <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                value={formData.organizationId}
                                onChange={(e) => setFormData({ ...formData, organizationId: e.target.value })}
                                required
                            >
                                {organizations.map((org) => (
                                    <option key={org.value} value={org.value}>
                                        {org.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Truck Capacity <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                value={formData.capacityId}
                                onChange={(e) => setFormData({ ...formData, capacityId: e.target.value })}
                                required
                            >
                                {capacities.map((capacity) => (
                                    <option key={capacity.value} value={capacity.value}>
                                        {capacity.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Local Transfer Type <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                value={formData.transferTypeId}
                                onChange={(e) => setFormData({ ...formData, transferTypeId: e.target.value })}
                                required
                            >
                                {transferTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Transport Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter transport company name"
                                value={formData.transportName}
                                onChange={(e) => setFormData({ ...formData, transportName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Transport Number</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter transport contact number"
                                value={formData.transportNo}
                                onChange={(e) => setFormData({ ...formData, transportNo: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Driver Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter driver's full name"
                                value={formData.driverName}
                                onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Driver Number</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter driver's contact number"
                                value={formData.driverNo}
                                onChange={(e) => setFormData({ ...formData, driverNo: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Material Type</label>
                            <select
                                className="form-select"
                                value={formData.materialType}
                                onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                            >
                                {materialTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Material Goods</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Describe the materials/goods"
                                value={formData.materialGoods}
                                onChange={(e) => setFormData({ ...formData, materialGoods: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '' : 'Check In Truck'}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}